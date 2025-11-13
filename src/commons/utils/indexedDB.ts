export interface StoreSchema {
  name: string; // 表名（object store 的名字）
  keyPath?: string; // 主键字段（如 "id"），如果不指定则默认 "id"
  autoIncrement?: boolean; // 主键是否自增（默认 true）
  indexes?: {
    name: string; // 索引名
    keyPath: string | string[]; // 索引对应的字段，可以是单个或多个
    options?: IDBIndexParameters; // 索引配置（如 unique: true）
  }[];
}

/**
 * IndexedDB 封装类
 *
 * - 自动处理数据库打开、升级、表创建
 * - 提供常用 CRUD 方法（put/get/getAll/delete/clear）
 * - 支持多表 schema 配置
 *
 * 使用方式：
 * ```ts
 * const db = new IndexedDBWrapper("MyAppDB", 1, [
 *   { name: "logs", keyPath: "id", autoIncrement: true }
 * ]);
 *
 * await db.put("logs", { message: "hello", createdAt: Date.now() });
 * const allLogs = await db.getAll("logs");
 * ```
 */
export class IndexedDBWrapper {
  private dbName: string; // 数据库名
  private version: number; // 版本号，版本变更时触发 onupgradeneeded
  private stores: StoreSchema[]; // 所有表的 schema 配置

  private db: IDBDatabase | null = null; // 数据库实例，成功打开后缓存

  /**
   * @summary 创建 IndexedDB 封装实例
   * @param dbName 数据库名（同源下唯一）
   * @param version 版本号（递增时会触发升级逻辑）
   * @param stores 数据表结构定义
   **/
  constructor(dbName: string, version: number, stores: StoreSchema[]) {
    this.dbName = dbName;
    this.version = version;
    this.stores = stores;
  }

  /**
   * 打开数据库（如果已打开则直接复用）
   * - 若数据库不存在会新建
   * - 若版本号增加会触发 onupgradeneeded，可在其中建表
   */
  async open(): Promise<IDBDatabase> {
    if (this.db) return this.db; // 已经打开则直接返回

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      // 数据库升级（首次创建或版本号增加）
      request.onupgradeneeded = () => {
        const db = request.result;
        this.stores.forEach((schema) => {
          if (!db.objectStoreNames.contains(schema.name)) {
            // 只在不存在时新建表
            const store = db.createObjectStore(schema.name, {
              keyPath: schema.keyPath || "id",
              autoIncrement: schema.autoIncrement ?? true,
            });
            // 建立索引
            schema.indexes?.forEach((idx) =>
              store.createIndex(idx.name, idx.keyPath, idx.options)
            );
          }
        });
      };
      // 成功打开数据库
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onerror = () => reject(request.error);
    });
  }
  
  /**
   * 获取指定表的对象仓库
   * @param storeName 表名
   * @param mode 事务模式（默认只读，可选 "readonly" | "readwrite"）
   */
  private getStore(storeName: string, mode: IDBTransactionMode = "readonly") {
    if (!this.db) throw new Error("Database not opened");
    return this.db.transaction(storeName, mode).objectStore(storeName);
  }

  /**
   * 查询表中所有数据
   * @param storeName 表名
   */
  async getlistAll<T>(storeName: string): Promise<T[]> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const request = this.getStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 查询单条数据
   * @param storeName 表名
   * @param key 主键
   */
  async getinfo<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const request = this.getStore(storeName).get(key);
      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 按索引查询（支持范围/精确匹配）
   * @param storeName 表名
   * @param indexName 索引名
   * @param query 查询条件
   *  - 可以是单个值（精确匹配）
   *  - 或 IDBKeyRange（范围查询，如 IDBKeyRange.bound(...)）
   * @returns 匹配到的结果数组
   */
  async queryByIndex<T>(
    storeName: string,
    indexName: string,
    query: IDBValidKey | IDBKeyRange
  ): Promise<T[]> {
    await this.open();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const index = store.index(indexName);
      const request = index.openCursor(query);
      const results: T[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(cursor.value as T);
          cursor.continue(); // 遍历下一个
        } else {
          resolve(results);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 新增或更新数据（根据主键是否存在决定）
   * @param storeName 表名
   * @param value 数据对象
   * @returns 主键值
   */
  async save<T>(storeName: string, value: T): Promise<IDBValidKey> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const request = this.getStore(storeName, "readwrite").put(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 删除单条数据
   * @param storeName 表名
   * @param key 主键
   */
  async delete(storeName: string, key: IDBValidKey): Promise<void> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const request = this.getStore(storeName, "readwrite").delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 清空表（删除所有数据）
   * @param storeName 表名
   */
  async clear(storeName: string): Promise<void> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const request = this.getStore(storeName, "readwrite").clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
