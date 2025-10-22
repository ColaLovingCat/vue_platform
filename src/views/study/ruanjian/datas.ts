export const ports = [
  {
    category: "网络与基础通信类",
    list: [
      {
        name: "FTP 数据",
        full: "File Transfer Protocol Data",
        port: "20",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "FTP 控制",
        full: "File Transfer Protocol Control",
        port: "21",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "FTPS",
        full: "FTP Secure",
        port: "990",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "SSH",
        full: "Secure Shell",
        port: "22",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "Telnet",
        full: "明文远程登录协议",
        port: "23",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "SMTP",
        full: "Simple Mail Transfer Protocol",
        port: "25",
        icon: "envelope",
        type: "TCP",
      },
      {
        name: "SMTPS",
        full: "SMTP over SSL",
        port: "465",
        icon: "envelope",
        type: "TCP",
      },
      {
        name: "Submission",
        full: "现代 SMTP 提交端口",
        port: "587",
        icon: "envelope",
        type: "TCP",
      },
      {
        name: "HTTP",
        full: "HyperText Transfer Protocol",
        port: "80",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "HTTPS",
        full: "HTTP Secure",
        port: "443",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "POP3",
        full: "Post Office Protocol v3",
        port: "110",
        icon: "envelope",
        type: "TCP",
      },
      {
        name: "POP3S",
        full: "POP3 over SSL",
        port: "995",
        icon: "envelope",
        type: "TCP",
      },
      {
        name: "IMAP",
        full: "Internet Message Access Protocol",
        port: "143",
        icon: "envelope",
        type: "TCP",
      },
      {
        name: "IMAPS",
        full: "IMAP over SSL",
        port: "993",
        icon: "envelope",
        type: "TCP",
      },
      {
        name: "SOCKS 代理",
        full: "通用代理传输协议",
        port: "1080",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "SMB",
        full: "Server Message Block",
        port: "445",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "LDAP",
        full: "Lightweight Directory Access Protocol",
        port: "389",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "LDAPS",
        full: "LDAP over SSL/TLS",
        port: "636",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "RPC",
        full: "Remote Procedure Call",
        port: "135",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "DNS",
        full: "Domain Name System",
        port: "53",
        icon: "wifi",
        type: "UDP",
      },
      {
        name: "DHCP 服务端",
        full: "为客户端分配 IP 地址",
        port: "67",
        icon: "wifi",
        type: "UDP",
      },
      {
        name: "DHCP 客户端",
        full: "Dynamic Host Configuration Protocol",
        port: "68",
        icon: "wifi",
        type: "UDP",
      },
      {
        name: "TFTP",
        full: "Trivial File Transfer Protocol",
        port: "69",
        icon: "wifi",
        type: "UDP",
      },
      {
        name: "SNMP",
        full: "Simple Network Management Protocol",
        port: "161/162",
        icon: "wifi",
        type: "TCP",
      },
    ],
  },
  {
    category: "数据库类",
    list: [
      {
        name: "MySQL",
        full: "MySQL Database Server",
        port: "3306",
        icon: "database",
        type: "TCP",
      },
      {
        name: "PostgreSQL",
        full: "PostgreSQL",
        port: "5432",
        icon: "database",
        type: "TCP",
      },
      {
        name: "Oracle",
        full: "Oracle Net Listener",
        port: "1521",
        icon: "database",
        type: "TCP",
      },
      {
        name: "MS SQL",
        full: "Microsoft SQL Server",
        port: "1433",
        icon: "database",
        type: "TCP",
      },
      {
        name: "SQL Server Browser",
        full: "数据库实例发现服务",
        port: "1434",
        icon: "database",
        type: "TCP",
      },
      {
        name: "MongoDB",
        full: "MongoDB",
        port: "27017",
        icon: "database",
        type: "TCP",
      },
      {
        name: "Redis",
        full: "In-memory Key-Value Database",
        port: "6379",
        icon: "database",
        type: "TCP",
      },
      {
        name: "Elasticsearch",
        full: "REST API 端口",
        port: "9200",
        icon: "database",
        type: "TCP",
      },
      {
        name: "Cassandra",
        full: "Cassandra Native Transport",
        port: "9042",
        icon: "database",
        type: "TCP",
      },
      {
        name: "Neo4j",
        full: "图数据库",
        port: "7474",
        icon: "database",
        type: "TCP",
      },
      {
        name: "InfluxDB",
        full: "时序数据库",
        port: "8086",
        icon: "database",
        type: "TCP",
      },
    ],
  },
  {
    category: "安全与远程管理类",
    list: [
      {
        name: "RDP",
        full: "Remote Desktop Protocol",
        port: "3389",
        icon: "wifi",
        type: "TCP",
      },
      {
        name: "VNC",
        full: "Virtual Network Computing",
        port: "5900",
        icon: "wifi",
        type: "TCP",
      },
    ],
  },
];

export const sql_01 = `
-- 插入数据
INSERT INTO students (name, age, gender, major, grade)
VALUES ('Alice', 20, 'F', 'Computer Science', 90);

-- 批量插入
INSERT INTO students (name, age, gender, major, grade)
VALUES 
('Bob', 22, 'M', 'Mathematics', 85),
('Cathy', 21, 'F', 'Physics', 88);

-- 更新数据
UPDATE students
SET grade = 95
WHERE name = 'Alice';

-- 删除数据
DELETE FROM students
WHERE grade < 60;
`;
export const sql_02 = `
-- 查询所有列
SELECT * FROM students;

-- 查询指定列
SELECT name, age, grade FROM students;

-- 条件查询
SELECT * FROM students WHERE grade >= 85;

-- 排序
SELECT * FROM students ORDER BY grade DESC;

-- 分组统计
SELECT major, AVG(grade) AS avg_grade
FROM students
GROUP BY major
HAVING AVG(grade) > 80;

-- 子查询
SELECT * 
FROM students
WHERE grade > (SELECT AVG(grade) FROM students);

-- 聚合函数
SELECT COUNT(*) AS total, MAX(grade) AS top_score FROM students;

-- 联接查询
SELECT students.name, courses.course_name
FROM students
INNER JOIN courses ON students.id = courses.student_id;
`;
export const sql_03 = `
-- 创建表
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(50) NOT NULL,
    age INT CHECK (age > 0),
    gender CHAR(1),
    major NVARCHAR(100),
    grade INT
);

-- 修改表：增加列
ALTER TABLE students ADD email NVARCHAR(100);

-- 修改表：修改列类型
ALTER TABLE students ALTER COLUMN age SMALLINT;

-- 删除列
ALTER TABLE students DROP COLUMN email;

-- 删除表
DROP TABLE students;
`;
export const sql_04 = `
-- 创建用户
CREATE USER user1 IDENTIFIED BY '123456';

-- 删除用户
DROP USER user1;

-- 给用户授予查询权限
GRANT SELECT ON students TO user1;

-- 授予插入、更新权限
GRANT INSERT, UPDATE ON students TO user1;

-- 回收权限
REVOKE UPDATE ON students FROM user1;
`;
export const sql_05 = `
-- 创建视图：优秀学生
CREATE VIEW v_top_students AS
SELECT id, name, grade
FROM students
WHERE grade >= 85;

-- 使用视图
SELECT * FROM v_top_students;

-- 删除视图
DROP VIEW v_top_students;
`;
export const sql_06 = `
-- 创建普通索引
CREATE INDEX idx_major ON students(major);

-- 创建唯一索引
CREATE UNIQUE INDEX idx_name ON students(name);

-- 删除索引
DROP INDEX idx_major ON students;
`;
export const sql_07 = `
-- 创建存储过程：按专业查询学生
DELIMITER $$  -- MySQL 用法，SQL Server/Oracle 语法略有不同
CREATE PROCEDURE GetStudentsByMajor(IN majorName NVARCHAR(100))
BEGIN
    SELECT id, name, age, grade
    FROM students
    WHERE major = majorName;
END $$
DELIMITER ;

-- 调用存储过程
CALL GetStudentsByMajor('Computer Science');

-- 删除存储过程
DROP PROCEDURE GetStudentsByMajor;
`;

export const code_huisu_01 = `#define N 4

int q[N + 1];

int check(int j)
{
    int i;
    for (i = 1; i < j; i++)
    {
        if (q[i] == q[j] || abs(i - j) == abs(q[i] - q[j]))
            return 0;
    }
    return 1;
}

void queen()
{
    int i;
    for (i = 1; i <= N; i++)
    {
        q[i] = 0;
    }
    int answer = 0;
    int j = 1;
    while (j >= 1)
    {
        q[j] = q[j] + 1;
        while (q[j] <= N && !check(j))
        {
            q[j] = q[j] + 1;
        }
    }
}

int main()
{
    queen();
    return 0;
}`;

export const code_huisu_02 = `#define N 4

int answer = 0;
int q[N + 1];

int check(int j)
{
    int i;
    for (i = 1; i < j; i++)
    {
        if (q[i] == q[j] || abs(i - j) == abs(q[i] - q[j]))
            return 0;
    }
    return 1;
}

void queen(int j)
{
    int i;
    for (i = 1; i <= N; i++)
    {
        q[j] = i;
        if (check(j))
        {
            if (j == N)
            {
                answer = answer + 1;
                for (i = 0; i <= N; i++)
                {
                    printf("%d", q[i]);
                }
                printf("\\n");
            }
            else
            {
                queen(j + 1);
            }
        }
    }
}`;

// 阶乘
export const code_fenzhi_01 = `const solve = (num: number): number => {
  if (num > 0) return num * solve(num - 1)
  return 1
}`;

// 归并排序
export const code_fenzhi_02 = `#include <climits>

void MergeSort(int A[], int p, int r)
{
    int q;
    if (p < r)
    {
        q = (p + r) / 2;
        MergeSort(A, p, q);
        MergeSort(A, q + 1, r);
        Merge(A, p, q, r);
    }
}
void Merge(int A[], int p, int q, int r)
{
    int n1 = q - p + 1, n2 = r - q; // 左右长度
    int i, j, k;
    int L[50], R[50];
    for (i = 0; i < n1; i++) // 放入左数组
        L[i] = A[p + i];
    for (j = 0; j < n2; j++) // 放入右数组
        R[j] = A[q + j + 1];
    L[n1] = INT_MAX; R[n2] = INT_MAX; // 将数组的边界值赋值为最大值
    i = 0; j = 0;
    for (k = p; k < r + 1; k++) // 往原数组依次放数
    {
        if (L[i] < R[j]) // 左边小
        {
            A[k] = L[i];
            i++;
        }
        else // 右边小
        {
            A[k] = R[j];
            j++;
        }
    }
}
`;

// 最大子段和问题
export const code_fenzhi_03 = `int MaxSubSum(int *Array, int left, int right)
{
    int sum = 0;
    int i;

    // 【递归终止条件】当区间只剩一个元素时
    if (left == right)
    {
        // 如果该元素为正，则最大子序列和就是它本身；否则为0（表示不取）
        if (Array[left] > 0) sum = Array[left];
        else sum = 0;
    }
    else
    {
        // 【分治步骤】取中点，将区间一分为二
        int center = (left + right) / 2;

        // 递归求解左半部分的最大子序列和
        int leftsum = MaxSubSum(Array, left, center);

        // 递归求解右半部分的最大子序列和
        int rightsum = MaxSubSum(Array, center + 1, right);
        
        // 跨区时
        // 从中点向左扫描，求左边的最大连续和
        int s1 = 0; // 左侧最大和
        int lefts = 0; // 左侧累计和
        for (i = center; i >= left; i--)
        {
            lefts = lefts + Array[i];
            if (lefts > s1) 
                s1 = lefts; // 记录目前为止最大的左侧和
        }

        // 从中点右边第一个元素开始向右扫描，求右边的最大连续和
        int s2 = 0; // 右侧最大和
        int rights = 0; // 右侧累计和
        for (i = center + 1; i <= right; i++)
        {
            rights = rights + Array[i];
            if (rights > s2)
                s2 = rights; // 记录目前为止最大的右侧和
        }
        // 跨越中点的最大子序列和
        sum = s1 + s2;

        // 求最大值
        if (sum < leftsum) sum = leftsum;
        if (sum < rightsum) sum = rightsum;
    }
    return sum;
}
`;

export const code_dongtai_01 = `#define N 4
#define W 5

int main()
{
    int v[] = {0, 2, 4, 5, 6}; // 物品价值
    int w[] = {0, 1, 2, 3, 4}; // 物品重量
      int dp[N + 1][W + 1] = {};
      int i, j;
    for (i = 0; i < N; i++)
    {
        for (j = 0; j < W; j++)
        {
            if (j >= w[i]) // 物品i可选
            {
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i]);
            }
            else // 不选物品i
            {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    printf("%d", dp[N][W]);
    
    return 0;
}

int max(int a, int b)
{
    return a > b ? a : b;
}
`;

export const code_tanxin_01 = `#define N 5
#define W 100

double merge(double arr[], int left, int right)
{
    // 归并排序方法
}

int main(int a, int b)
{
    int v[] = {0, 65, 20, 30, 60, 40};
    int w[] = {0, 30, 10, 20, 50, 40};
    // 物品单位价值
    double vw[N + 1]; 
    // 计算单位价值
    int i;
    for (i = 0; i <= N; i++)
        vw[i] = (double)v[i] / w[i];
    // 归并排序，从大到小
    merge(vw, 0, N);
    // 依次放入物品
    maxValue(v_temp, w_temp, vw_temp);
    return 0;
}
`;

export const code_tanxin_02 = `double v_temp[N + 1];
double w_temp[N + 1];
double vw_temp[N + 1];

double merge(double arr[], int left, int right)
{
    // 归并排序方法
}

double maxValue(int v[], int w[], double vw[])
{
    double result = 0.0;
    int W_temp = W;
    int i;

    // 物品作为整体放入
    for (i = 0; i <= N; i++)
    {
        if (W_temp >= w[i])
        {
            result = result + v[i];
            W_temp = W_temp = w[i];
        }
        else
            break;
    }

    // 剩余容量
    if (W_temp > 0 && i <= N)
    {
        result = result + (double)W_temp / w[i] * v[i];
    }

    return result;
}
`;

export const code_jiandan_01 = `abstract class Coffee {
    public abstract void info();
}

class AmericanoCoffee extends Coffee {
    @Override
    public void info() {
        System.out.println("美式咖啡");
    }
}

class LatteCoffee extends Coffee {
    @Override
    public void info() {
        System.out.println("拿铁咖啡");
    }
}

class CoffeeFactory {
    public static Coffee createCoffee(String type) {
        Coffee coffee = null;
        switch (type) {
            case "americano":
                coffee = new AmericanoCoffee();
                break;
            case "latte":
                coffee = new LatteCoffee();
                break;
            default:
                break;
        }
        return coffee;
    }
}

class Coffee_SimpleFactory {
    public static void main(String[] args) {
        Coffee americanoCoffee = CoffeeFactory.createCoffee("americano");
        americanoCoffee.info();
        Coffee latteCoffee = CoffeeFactory.createCoffee("latte");
        latteCoffee.info();
    }
}
`;

export const code_gongchang_01 = `interface Coffee {
    public void info();

    public void addCoffee();
    public void addOther();
}
`;
export const code_gongchang_02 = `class AmericanoCoffee implements Coffee {
    @Override
    public void info() {
        System.out.println("get AmericanoCoffee");
    }

    @Override
    public void addCoffee() {
        System.out.println("add 60ml Coffee");
    }

    @Override
    public void addOther() {
        System.out.println("add 250ml Water");
    }
}

class LatteCoffee implements Coffee {
    @Override
    public void info() {
        System.out.println("get LatteCoffee");
    }

    @Override
    public void addCoffee() {
        System.out.println("add 30ml Coffee");
    }

    @Override
    public void addOther() {
        System.out.println("add 175ml Milk");
    }
}
`;
export const code_gongchang_03 = `interface CoffeeFactory {
    public Coffee createCoffee();
}
`;
export const code_gongchang_04 = `class AmericanoFactory implements CoffeeFactory {
    @Override
    public Coffee createCoffee() {
        return new AmericanoCoffee();
    }
}

class LatteFactory implements CoffeeFactory {
    @Override
    public Coffee createCoffee() {
        return new LatteCoffee();
    }
}
`;
export const code_gongchang_05 = `class Client {
    public static void main(String[] args) {
        AmericanoFactory americanoFactory = new AmericanoFactory();
        Coffee americanoCoffee = americanoFactory.createCoffee();
        americanoCoffee.addCoffee();
        americanoCoffee.addOther();
        americanoCoffee.info();

        LatteFactory latteFactory = new LatteFactory();
        Coffee latteCoffee = latteFactory.createCoffee();
        latteCoffee.addCoffee();
        latteCoffee.addOther();
        latteCoffee.info();
    }
}
`;

export const code_chouxiang_01 = `interface Dessert {
    public void info();
}`;
export const code_chouxiang_02 = `class MatchaMousse implements Dessert {
    @Override
    public void info() {
        System.out.println("get Matcha Mousse");
    }
}

class Tiramisu implements Dessert {
    @Override
    public void info() {
        System.out.println("get Tiramisu");
    }
}`;
export const code_chouxiang_03 = `interface DessertFactory {
    public Coffee createCoffee();

    public Dessert createDessert();
}`;
export const code_chouxiang_04 = `// 美式甜点工厂
class AmericanDessertFactory implements DessertFactory {
    @Override
    public Coffee createCoffee() {
        return new AmericanoCoffee();
    }

    @Override
    public Dessert createDessert() {
        return new MatchaMousse();
    }
}

// 意大利风味甜点工厂
class ItalyDessertFactory implements DessertFactory {
    @Override
    public Coffee createCoffee() {
        return new LatteCoffee();
    }

    @Override
    public Dessert createDessert() {
        return new Tiramisu();
    }
}`;
export const code_chouxiang_05 = `class Client {
    public static void main(String[] args) {
        DessertFactory americanFactory = new AmericanDessertFactory();
        Coffee americanCoffee = americanFactory.createCoffee();
        americanCoffee.addCoffee();
        americanCoffee.addOther();
        americanCoffee.info();
        Dessert americanDessert = americanFactory.createDessert();
        americanDessert.info();

        DessertFactory italyFactory = new ItalyDessertFactory();
        Coffee italyCoffee = italyFactory.createCoffee();
        italyCoffee.addCoffee();
        italyCoffee.addOther();
        italyCoffee.info();
        Dessert italyDessert = italyFactory.createDessert();
        italyDessert.info();
    }
}
`;

export const code_shengchengqi_01 = `// 自行车类
class Bike {
    private String frame;
    private String seat;

    public String getFrame() {
        return frame;
    }
    public void setFrame(String frame) {
        this.frame = frame;
    }

    public String getSeat() {
        return seat;
    }
    public void setSeat(String seat) {
        this.seat = seat;
    }
}`;
export const code_shengchengqi_02 = `// 抽象 builder 类
abstract class Builder {
    protected Bike mBike = new Bike();

    public abstract void buildFrame();
    public abstract void buildSeat();
    public abstract Bike createBike();
}`;
export const code_shengchengqi_03 = `// 指挥者类
class Director {
    private Builder mBuilder;
    public Director(Builder builder) {
        mBuilder = builder;
    }

    public Bike construct() {
        mBuilder.buildFrame();
        mBuilder.buildSeat();
        return mBuilder.createBike();
    }
}`;
export const code_shengchengqi_04 = `// 摩拜单车Builder类
class MobikeBuilder extends Builder {
    @Override
    public void buildFrame() {
        mBike.setFrame("Aluminum frame");
    }

    @Override
    public void buildSeat() {
        mBike.setSeat("Leather seat");
    }

    @Override
    public Bike createBike() {
        return mBike;
    }
}

// ofo单车Builder类
class OfoBuilder extends Builder {
    @Override
    public void buildFrame() {
        mBike.setFrame("Carbon frame");
    }

    @Override
    public void buildSeat() {
        mBike.setSeat("Rubber seat");
    }

    @Override
    public Bike createBike() {
        return mBike;
    }
}
`;
export const code_shengchengqi_05 = `class Client {
    public static void main(String[] args) {
        showBike(new OfoBuilder());
        showBike(new MobikeBuilder());
    }

    private static void showBike(Builder builder) {
        Director director = new Director(builder);
        Bike bike = director.construct();
        System.out.println(bike.getFrame());
        System.out.println(bike.getSeat());
    }
}
`;

export const code_yuanxing_01 = `// 奖状类
public class Citation implements Cloneable {
    private String name;

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return (this.name);
    }

    public void show() {
        System.out.println(name + "同学：在2020学年第一学期中表现优秀，被评为三好学生。特发此状！");
    }

    @Override
    public Citation clone() throws CloneNotSupportedException {
        return (Citation) super.clone();
    }
}

// 测试访问类
public class CitationTest {
    public static void main(String[] args) throws CloneNotSupportedException {
        Citation c1 = new Citation();
        c1.setName("张三");        
        // 复制奖状
        Citation c2 = c1.clone();
        // 将奖状的名字修改李四
        c2.setName("李四");
        c1.show();
        c2.show();
    }
}
`;

export const code_danli_01 = `/**
 * 饿汉式-静态变量创建类的对象
 */
public class Singleton {
    //私有构造方法
    private Singleton() {}

    //在成员位置创建该类的对象
    private static Singleton instance = new Singleton();

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {
        return instance;
    }
}

/**
 * 恶汉式
 * 在静态代码块中创建该类对象
 */
public class Singleton {

    // 私有构造方法
    private Singleton() {
    }

    // 在成员位置创建该类的对象
    private static Singleton instance;

    static {
        instance = new Singleton();
    }

    // 对外提供静态方法获取该对象
    public static Singleton getInstance() {
        return instance;
    }
}

/**
 * 懒汉式
 * 线程不安全
 */
public class Singleton {
    // 私有构造方法
    private Singleton() {
    }

    // 在成员位置创建该类的对象
    private static Singleton instance;​

    // 对外提供静态方法获取该对象
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

/**
 * 懒汉式
 * 线程安全
 */
public class Singleton {
    // 私有构造方法
    private Singleton() {
    }

    // 在成员位置创建该类的对象
    private static Singleton instance;

    // 对外提供静态方法获取该对象
    public static synchronized Singleton getInstance() {

        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

/**
 * 双重检查方式
 */
public class Singleton {
    //私有构造方法
    private Singleton() {}

    private static volatile Singleton instance;

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {
        //第一次判断，如果instance不为null，不进入抢锁阶段，直接返回实际
        if(instance == null) {
            synchronized (Singleton.class) {
                //抢到锁之后再次判断是否为空
                if(instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
`;

export const code_shipei_01 = `// 电脑类
public class Computer {
    public String readSD(SDCard sdCard) {
        if (sdCard == null) {
            throw new NullPointerException("sd card null");
        }
        return sdCard.readSD();
    }
}
`;

export const code_shipei_02 = `// SD卡的接口
public interface SDCard {
    // 读取SD卡方法
    String readSD();
    // 写入SD卡功能
    void writeSD(String msg);
}

// SD卡实现类
public class SDCardImpl implements SDCard {
    public String readSD() {
        String msg = "sd card read a msg :hello word SD";
        return msg;
    }

    public void writeSD(String msg) {
        System.out.println("sd card write msg : " + msg);
    }
}
`;

export const code_shipei_03 = `// TF卡接口
public interface TFCard {
    // 读取TF卡方法
    String readTF();
    // 写入TF卡功能
    void writeTF(String msg);
}

// TF卡实现类
public class TFCardImpl implements TFCard {
    public String readTF() {
        String msg = "tf card read msg : hello word tf card";
        return msg;
    }

    public void writeTF(String msg) {
        System.out.println("tf card write a msg : " + msg);
    }
}
`;

export const code_shipei_04 = `// 定义适配器类（SD兼容TF）
public class SDAdapterTF extends TFCardImpl implements SDCard {
    public String readSD() {
        System.out.println("adapter read tf card ");
        return readTF();
    }

    public void writeSD(String msg) {
        System.out.println("adapter write tf card");
        writeTF(msg);
    }
}
`;

export const code_shipei_05 = `// 测试类
public class Client {
    public static void main(String[] args) {
        Computer computer = new Computer();
        SDCard sdCard = new SDCardImpl();
        System.out.println(computer.readSD(sdCard));  
            
        System.out.println("------------");
        SDAdapterTF adapter = new SDAdapterTF();
        System.out.println(computer.readSD(adapter));
    }
}
`;

export const code_qiao_01 = `// 视频文件（实现化角色）
public interface VideoFile {
    void decode(String fileName);
}
`;

export const code_qiao_02 = `// avi文件（具体实现化角色 ）
public class AVIFile implements VideoFile {
    public void decode(String fileName) {
        System.out.println("avi file: " + fileName);
    }
}

// rmvb文件（具体实现化角色 ）
public class RMVBBFile implements VideoFile {
    public void decode(String fileName) {
        System.out.println("rmvb file: " + fileName);
    }
}
`;

export const code_qiao_03 = `// 操作系统版本（抽象化角色）
public abstract class OperatingSystem {
    protected VideoFile videoFile;   
    
    public OperatingSystem(VideoFile videoFile) {
        this.videoFile = videoFile;
    }
    
    public abstract void play(String fileName);
}
`;

export const code_qiao_04 = `// Windows版本（扩展抽象化角色）
public class Windows extends OperatingSystem {
    public Windows(VideoFile videoFile) {
        super(videoFile);
    }

    public void play(String fileName) {
        videoFile.decode(fileName);
    }
}

// mac版本（扩展抽象化角色）
public class Mac extends OperatingSystem {
    public Mac(VideoFile videoFile) {
        super(videoFile);
    }

    public void play(String fileName) {
        videoFile.decode(fileName);
    }
}
`;

export const code_qiao_05 = `// 测试类
public class Client {
    public static void main(String[] args) {
        OperatingSystem os = new Windows(new AVIFile());
        os.play("video.avi");
    }
}
`;

export const code_zuhe_01 = `// 菜单组件，菜单/菜单项都继承该类（抽象根节点）
public abstract class MenuComponent {
    protected String name;
    protected int level;
    
    // 添加菜单
    public void add(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }
    // 移除菜单
    public void remove(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }
    
    // 获取指定的子菜单
    public MenuComponent getChild(int i) {
        throw new UnsupportedOperationException();
    }
    
    // 获取菜单名称
    public String getName() {
        return name;
    }

    public void print() {
        throw new UnsupportedOperationException();
    }
}
`;

export const code_zuhe_02 = `// 子菜单（叶子节点）
public class MenuItem extends MenuComponent {
    public MenuItem(String name, int level) {
        this.name = name;
        this.level = level;
    }

    @Override
    public void print() {
        // 方便打印出层级效果
        for (int i = 1; i < level; i++) {
            System.out.print("--");
        }
        System.out.println(name);
    }
}
`;

export const code_zuhe_03 = `// 子菜单项（树枝节点）
public class Menu extends MenuComponent {
    private List<MenuComponent> menuComponentList;    
    
    public Menu(String name, int level) {
        this.level = level; this.name = name;
        menuComponentList = new ArrayList<MenuComponent>();
    }    
        
    @Override
    public void add(MenuComponent menuComponent) {
        menuComponentList.add(menuComponent);
    }    
        
    @Override
    public void remove(MenuComponent menuComponent) {
        menuComponentList.remove(menuComponent);
    }    
        
    @Override
    public MenuComponent getChild(int i) {
        return menuComponentList.get(i);
    }   
        
    @Override
    public void print() {
        // 方便打印出层级效果
        for (int i = 1; i < level; i++) {
            System.out.print("--");
        }
        System.out.println(name);
        for (MenuComponent menuComponent : menuComponentList) {
            menuComponent.print();
        }
    }
}
`;

export const code_zuhe_04 = `// 测试类
public class Client {
    public static void main(String[] args) {
        // 创建菜单树
        MenuComponent menu1 = new Menu("菜单管理", 2);
        menu1.add(new MenuItem("页面访问", 3));
        menu1.add(new MenuItem("展开菜单", 3));
        menu1.add(new MenuItem("编辑菜单", 3));
        menu1.add(new MenuItem("删除菜单", 3));
        menu1.add(new MenuItem("新增菜单", 3));

        MenuComponent menu2 = new Menu("权限管理", 2);
        menu2.add(new MenuItem("页面访问", 3));
        menu2.add(new MenuItem("提交保存", 3));

        MenuComponent menu3 = new Menu("角色管理", 2);
        menu3.add(new MenuItem("页面访问", 3));
        menu3.add(new MenuItem("新增角色", 3));
        menu3.add(new MenuItem("修改角色", 3));

        // 创建一级菜单
        MenuComponent component = new Menu("系统管理", 1);
        // 将二级菜单添加到一级菜单中
        component.add(menu1);
        component.add(menu2);
        component.add(menu3);

        // 打印菜单名称(如果有子菜单一块打印)
        component.print();
    }
}
`;

export const code_zhuang_01 = `// 快餐接口
public abstract class FastFood {
    private float price;
    private String desc;

    public FastFood() { }
    public FastFood(float price, String desc) {
        this.price = price;
        this.desc = desc;
    }

    public void setPrice(float price) {
        this.price = price;
    }
    public float getPrice() {
        return price;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
    public String getDesc() {
        return desc;
    }

    public abstract float cost(); // 获取价格
}
`;

export const code_zhuang_02 = `// 炒饭
public class FriedRice extends FastFood {
    public FriedRice() {
        super(10, "炒饭");
    }
    public float cost() {
        return getPrice();
    }
}

// 炒面
public class FriedNoodles extends FastFood {
    public FriedNoodles() {
        super(12, "炒面");
    }
    public float cost() {
        return getPrice();
    }
}
`;

export const code_zhuang_03 = `// 配料类
public abstract class Garnish extends FastFood {
    public Garnish(FastFood fastFood, float price, String desc) {
        super(price, desc);
        this.fastFood = fastFood;
    }
    
    private FastFood fastFood;
    public FastFood getFastFood() {
        return fastFood;
    }
    public void setFastFood(FastFood fastFood) {
        this.fastFood = fastFood;
    }
}
`;

export const code_zhuang_04 = `// 鸡蛋配料
public class Egg extends Garnish {
    public Egg(FastFood fastFood) {
        super(fastFood, 1, "鸡蛋");
    }
    
    @Override
    public float cost() {
        return getPrice() + getFastFood().getPrice();
    }    
        
    @Override
    public String getDesc() {
        return super.getDesc() + getFastFood().getDesc();
    }
}

// 培根配料
public class Bacon extends Garnish {
    public Bacon(FastFood fastFood) {
        super(fastFood, 2, "培根");
    }    
        
    @Override
    public float cost() {
        return getPrice() + getFastFood().getPrice();
    }   
        
    @Override
    public String getDesc() {
        return super.getDesc() + getFastFood().getDesc();
    }
}
`;

export const code_zhuang_05 = `// 测试类
public class Client {
    public static void main(String[] args) {
        // 点一份炒饭
        FastFood food = new FriedRice();
        System.out.println(food.getDesc() + " " + food.cost() + "元");

        System.out.println("========");
        // 点一份加鸡蛋的炒饭
        FastFood food1 = new FriedRice();
        System.out.println(food1.getDesc() + " " + food1.cost() + "元");
        food1 = new Egg(food1);
        System.out.println(food1.getDesc() + " " + food1.cost() + "元");

        System.out.println("========");
        // 点一份加培根的炒面
        FastFood food2 = new FriedNoodles();
        System.out.println(food2.getDesc() + " " + food2.cost() + "元");
        food2 = new Bacon(food2);
        System.out.println(food2.getDesc() + " " + food2.cost() + "元");
    }
}
`;

export const code_wai_01 = `// 智能音箱
public class SmartAppliancesFacade {
    private Light light;
    private TV tv;
    private AirCondition airCondition;

    public SmartAppliancesFacade() {
        light = new Light();
        tv = new TV();
        airCondition = new AirCondition();
    }

    public void say(String message) {
        if (message.contains("打开")) {
            on();
        } else if (message.contains("关闭")) {
            off();
        } else {
            System.out.println("我还听不懂你说的！！！");
        }
    }

    // 起床后一键开电器
    private void on() {
        System.out.println("起床了");
        light.on();
        tv.on();
        airCondition.on();
    }

    // 睡觉一键关电器
    private void off() {
        System.out.println("睡觉了");
        light.off();
        tv.off();
        airCondition.off();
    }
}
`;

export const code_wai_02 = `// 灯类
public class Light {
    public void on() {
        System.out.println("打开了灯....");
    }
    public void off() {
        System.out.println("关闭了灯....");
    }
}

// 电视类
public class TV {
    public void on() {
        System.out.println("打开了电视....");
    }
    public void off() {
        System.out.println("关闭了电视....");
    }
}

// 控制类
public class AirCondition {
    public void on() {
        System.out.println("打开了空调....");
    }
    public void off() {
        System.out.println("关闭了空调....");
    }
}
`;

export const code_wai_03 = `// 测试类
public class Client {
    public static void main(String[] args) {
        // 创建外观对象
        SmartAppliancesFacade facade = new SmartAppliancesFacade();

        // 客户端直接与外观对象进行交互
        facade.say("打开家电");
        facade.say("关闭家电");
    }
}
`;

export const code_xiang_01 = `// 抽象享元角色
public abstract class AbstractBox {
    // 获取图形的方法
    public abstract String getShape();
    // 显示图形及颜色
    public void display(String color) {
        System.out.println("方块形状：" + this.getShape() + " 颜色：" + color);
    }
}
`;

export const code_xiang_02 = `// 享元工厂角色，这里采用的是饿汉式单例
public class BoxFactory {
    // 享元池
    private static HashMap<String, AbstractBox> map;

    // 在构造方法中进行初始化操作
    private BoxFactory() {
        map = new HashMap<String, AbstractBox>();
        AbstractBox iBox = new IBox();
        AbstractBox lBox = new LBox();
        AbstractBox oBox = new OBox();
        map.put("I", iBox);
        map.put("L", lBox);
        map.put("O", oBox);
    }

    // 提供一个方法获取该工厂类对象
    public static final BoxFactory getInstance() {
        return SingletonHolder.INSTANCE;
    }
    private static class SingletonHolder {
        private static final BoxFactory INSTANCE = new BoxFactory();
    }

    // 根据名称获取图形对象
    public AbstractBox getShape(String key) {
        return map.get(key);
    }
}
`;

export const code_xiang_03 = `// 这3个都是具体享元角色
public class IBox extends AbstractBox {
    @Override
    public String getShape() {
        return "I";
    }
}

public class LBox extends AbstractBox {
    @Override
    public String getShape() {
        return "L";
    }
}

public class OBox extends AbstractBox {
    @Override
    public String getShape() {
        return "O";
    }
}
`;

export const code_xiang_04 = `public class Client {
    public static void main(String[] args) {
        //获取I图形对象
        AbstractBox box1 = BoxFactory.getInstance().getShape("I");
        box1.display("灰色");
 
        //获取L图形对象
        AbstractBox box2 = BoxFactory.getInstance().getShape("L");
        box2.display("绿色");
 
        //获取O图形对象
        AbstractBox box3 = BoxFactory.getInstance().getShape("O");
        box3.display("灰色");
 
        //获取O图形对象
        AbstractBox box4 = BoxFactory.getInstance().getShape("O");
        box4.display("红色");
 
        System.out.println("两次获取到的O图形对象是否是同一个对象：" + (box3 == box4));
    }
}
`;

export const code_dai_01 = `// 卖票接口
public interface SellTickets {
    void sell();
}
`;

export const code_dai_02 = `// 火车站  火车站具有卖票功能，所以需要实现SellTickets接口
public class TrainStation implements SellTickets {
    public void sell() {
        System.out.println("火车站卖票");
    }
}
`;

export const code_dai_03 = `//代售点
public class ProxyPoint implements SellTickets {
    private TrainStation station = new TrainStation();
    public void sell() {
        System.out.println("代理点收取一些服务费用");
        station.sell();
    }
}
`;

export const code_dai_04 = `// 测试类
public class Client {
    public static void main(String[] args) {
        ProxyPoint pp = new ProxyPoint();
        pp.sell();
    }
}
`;

export const code_ze_01 = `// 处理者抽象类
public abstract class Handler {
    protected final static int NUM_ONE = 1;
    protected final static int NUM_THREE = 3;
    protected final static int NUM_SEVEN = 7;

    // 该领导处理的请求天数区间
    private int numStart;
    private int numEnd;

    // 声明后续者（声明上级领导）
    private Handler nextHandler;
    public Handler(int numStart) {
        this.numStart = numStart;
    }
    public Handler(int numStart, int numEnd) {
        this.numStart = numStart;
        this.numEnd = numEnd;
    }

    // 设置上级领导对象
    public void setNextHandler(Handler nextHandler) {
        this.nextHandler = nextHandler;
    }

    // 各级领导处理请求条的方法
    protected abstract void handleLeave(LeaveRequest leave);

    // 提交请求条
    public final void submit(LeaveRequest leave) {
        // 该领导进行审批
        this.handleLeave(leave);
        if (this.nextHandler != null && leave.getNum() > this.numEnd) {
            // 提交给上级领导进行审批
            this.nextHandler.submit(leave);
        } else {
            System.out.println("流程结束！");
        }
    }
}
`;

export const code_ze_02 = `// 小组长类
public class GroupLeader extends Handler {
    public GroupLeader() {
        super(0, Handler.NUM_ONE);
    }
    protected void handleLeave(LeaveRequest leave) {
        System.out.println(leave);
        System.out.println("小组长审批：同意");
    }
}

// 部门经理
public class Manager extends Handler {
    public Manager() {
        super(Handler.NUM_ONE, Handler.NUM_THREE);
    }
    protected void handleLeave(LeaveRequest leave) {
        System.out.println(leave);
        System.out.println("部门经理审批：同意");
    }
}

// 总经理
public class GeneralManager extends Handler {
    public GeneralManager() {
        super(Handler.NUM_THREE, Handler.NUM_SEVEN);
    }
    protected void handleLeave(LeaveRequest leave) {
        System.out.println(leave);
        System.out.println("总经理审批：同意");
    }
}
`;

export const code_ze_03 = `// 请假条
public class LeaveRequest {
    private String name;// 姓名
    private int num;// 请假天数
    private String content;// 请假内容

    public LeaveRequest(String name, int num, String content) {
        this.name = name;
        this.num = num;
        this.content = content;
    }

    public String getName() {
        return name;
    }
    public int getNum() {
        return num;
    }
    public String getContent() {
        return content;
    }

    // 重写toString
    @Override
    public String toString() {
        return this.name+ "请假" + this.name + "天，" + this.content + "。";
    }
}
`;

export const code_ze_04 = `public class Client {
    public static void main(String[] args) {
        // 创建一个请假条对象
        LeaveRequest leave = new LeaveRequest("小明", 2, "身体不适");

        // 创建各级领导对象
        GroupLeader groupLeader = new GroupLeader();
        Manager manager = new Manager();
        GeneralManager generalManager = new GeneralManager();

        // 设置处理者链
        groupLeader.setNextHandler(manager);
        manager.setNextHandler(generalManager);

        // 小明提交请假申请
        groupLeader.submit(leave);
    }
}
`;

export const code_mingling_01 = `// 抽象命令类
public interface Command {
    // 命令执行方法
    void execute();
}
`;

export const code_mingling_02 = `// 订单命令类，属于具体的命令类，需要聚合对象接收者和接收者依赖的操作数据
public class OrderCommand implements Command {
    // 持有接收者对象
    private SeniorChef receiver;
    // 订单，接收者依赖的操作数据
    private Order order;

    public OrderCommand(SeniorChef receiver, Order order) {
        this.receiver = receiver;
        this.order = order;
    }

    public void execute() {
        System.out.println("开始" + order.getDiningTable() + "桌的订单");
        Map<String, Integer> foodDir = order.getFoodDir();
        // 遍历map集合
        Set<String> keys = foodDir.keySet();
        for (String foodName : keys) {
            receiver.makeFood(foodName, foodDir.get(foodName));
        }
        System.out.println(order.getDiningTable() + "桌的饭准备完毕！！！");
    }
}
`;

export const code_mingling_03 = `// 资深大厨类，是命令的Receiver（接收者角色）
public class SeniorChef {
    // 根据餐品及分数制作食物
    public void makeFood(String name, int num) {
        System.out.println("大厨：做了" + num + "份" + name);
    }
}
`;

export const code_mingling_04 = `// 服务员类，调用者（请求者）角色
public class Waitor {
    // 持有多个命令对象
    private List<Command> commands = new ArrayList<Command>();

    public void setCommand(Command cmd) {
        // 将cmd对象存储到list集合中
        commands.add(cmd);
    }

    // 发起命令功能 喊 订单来了
    public void orderUp() {
        System.out.println("美女服务员：大厨，新订单来了。。。。");
        // 遍历list集合
        for (Command command : commands) {
            if (command != null) {
                command.execute();
            }
        }
    }
}
`;

export const code_mingling_05 = `// 订单类
public class Order {
    // 餐桌号码
    private int diningTable;
    // 所下的餐品及份数
    private Map<String, Integer> foodDir = new HashMap<String, Integer>();

    public int getDiningTable() {
        return diningTable;
    }

    public void setDiningTable(int diningTable) {
        this.diningTable = diningTable;
    }

    public Map<String, Integer> getFoodDir() {
        return foodDir;
    }

    public void setFood(String name, int num) {
        foodDir.put(name, num);
    }
}
`;

export const code_mingling_06 = `public class Client {
    public static void main(String[] args) {
        // 创建第一个订单对象
        Order order1 = new Order();
        order1.setDiningTable(1);
        order1.setFood("西红柿鸡蛋面", 1);
        order1.setFood("小杯可乐", 2);

        // 创建第二个订单对象
        Order order2 = new Order();
        order2.setDiningTable(2);
        order2.setFood("尖椒肉丝盖饭", 1);
        order2.setFood("小杯雪碧", 1);

        // 创建厨师对象
        SeniorChef receiver = new SeniorChef();

        // 创建命令对象
        OrderCommand cmd1 = new OrderCommand(receiver, order1);
        OrderCommand cmd2 = new OrderCommand(receiver, order2);

        // 创建调用者（服务员对象）
        Waitor invoke = new Waitor();
        invoke.setCommand(cmd1);
        invoke.setCommand(cmd2);

        // 让服务员发起命令
        invoke.orderUp();
    }
}
`;

export const code_jieshi_01 = `// 抽象表达式类
public abstract class AbstractExpression {
    // 解释操作，所有的具体表达式（加、减、值、变量）都要实现它
    public abstract int interpret(Context context);
}
`;

export const code_jieshi_02 = `// 非终结符表达式角色 减法表达式 (left - right)
public class Minus extends AbstractExpression {
    // -号左边的表达式
    private AbstractExpression left;
    // -号右边的表达式
    private AbstractExpression right;
    public Minus(AbstractExpression left, AbstractExpression right) {
        this.left = left;
        this.right = right;
    }
    public int interpret(Context context) {
        // 将左边表达式的结果和右边表达式的结果进行相减
        return left.interpret(context) - right.interpret(context);
    }
    @Override
    public String toString() {
        // 用括号保证运算优先级的正确性
        return "(" + left.toString() + " - " + right.toString() + ")";
    }
}

// 非终结符表达式角色 加法表达式 (left + right)
public class Plus extends AbstractExpression {
    // +号左边的表达式
    private AbstractExpression left;
    // +号右边的表达式
    private AbstractExpression right;
    public Plus(AbstractExpression left, AbstractExpression right) {
        this.left = left;
        this.right = right;
    }
    public int interpret(Context context) {
        // 将左边表达式的结果和右边表达式的结果进行相加
        return left.interpret(context) + right.interpret(context);
    }
    @Override
    public String toString() {
        return "(" + left.toString() + " + " + right.toString() + ")";
    }
}
`;

export const code_jieshi_03 = `// 环境角色类 保存外部赋值
public class Context {
    private Map<Variable, Integer> map = new HashMap<Variable, Integer>();
    
    // 给变量赋值
    public void assign(Variable var, Integer value) {
        map.put(var, value);
    }

    // 获取某个变量的值
    public int getValue(Variable var) {
        Integer value = map.get(var);
        return value;
    }
}
`;

export const code_jieshi_04 = `// 终结符表达式角色 常量表达式
public class Value extends AbstractExpression {
    private int value;
    public Value(int value) {
        this.value = value;
    }

    @Override
    public int interpret(Context context) {
        // 常量不依赖环境，直接返回
        return value;
    }

    @Override
    public String toString() {
        return new Integer(value).toString();
    }
}

// 变量表达式
public class Variable extends AbstractExpression {
    // 声明存储变量名的成员变量（比如 "a", "b"）
    private String name;
    public Variable(String name) {
        this.name = name;
    }

    public int interpret(Context context) {
        // 从上下文中取出变量的值
        return context.getValue(this);
    }
        
    @Override
    public String toString() {
        return name;
    }
}
`;

export const code_jieshi_05 = `// 构建抽象语法树（AST），并解释执行
public class Client {
    public static void main(String[] args) {
        // 创建环境对象（上下文）
        Context context = new Context();

        // 创建多个变量对象
        Variable a = new Variable("a");
        Variable b = new Variable("b");
        Variable c = new Variable("c");
        Variable d = new Variable("d");
        // Value v = new Value(1);

        // 将变量存储到环境对象中
        context.assign(a, 1);
        context.assign(b, 2);
        context.assign(c, 3);
        context.assign(d, 4);

        // 获取抽象语法树 a - (b - c + d)
        AbstractExpression expression = new Minus(a, new Plus(new Minus(b, c), d));
        
        // 解释（计算）
        int result = expression.interpret(context);
        System.out.println(expression + " = " + result);
    }
}
`;

export const code_dei_01 = `// 抽象聚合角色接口
public interface StudentAggregate {
    // 添加学生功能
    void addStudent(Student stu);
    // 删除学生功能
    void removeStudent(Student stu);
    // 获取迭代器对象功能
    StudentIterator getStudentIterator();
}
`;

export const code_dei_02 = `// 具体聚合角色
public class StudentAggregateImpl implements StudentAggregate {
    private List<Student> list = new ArrayList<Student>();
    public void addStudent(Student stu) {
        list.add(stu);
    }
    public void removeStudent(Student stu) {
        list.remove(stu);
    }
    // 获取迭代器对象
    public StudentIterator getStudentIterator() {
        return new StudentIteratorImpl(list);
    }
}
`;

export const code_dei_03 = `// 抽象迭代器角色接口
public interface StudentIterator {
    // 判断是否还有元素
    boolean hasNext();
    // 获取下一个元素
    Student next();
}
`;

export const code_dei_04 = `// 具体迭代器角色类
public class StudentIteratorImpl implements StudentIterator {
    private List<Student> list;
    private int position = 0;// 用来记录遍历时的位置
    public StudentIteratorImpl(List<Student> list) {
        this.list = list;
    }
    public boolean hasNext() {
        return position < list.size();
    }
    public Student next() {
        // 从集合中获取指定位置的元素
        Student currentStudent = list.get(position);
        position++;
        return currentStudent;
    }
}
`;

export const code_dei_05 = `public class Student {
    private String name;
    private String number;    
    
    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", number='" + number + '\'' +
                '}';
    }    
                
    public String getName() {
        return name;
    }    
        
    public void setName(String name) {
        this.name = name;
    }    
        
    public String getNumber() {
        return number;
    }    
        
    public void setNumber(String number) {
        this.number = number;
    }    
        
    public Student(String name, String number) {
        this.name = name;
        this.number = number;
    }    
        
    public Student() { }
}
`;

export const code_dei_06 = `public class Client {
    public static void main(String[] args) {
        // 创建聚合对象
        StudentAggregateImpl aggregate = new StudentAggregateImpl();
        // 添加元素
        aggregate.addStudent(new Student("张三", "001"));
        aggregate.addStudent(new Student("李四", "002"));
        aggregate.addStudent(new Student("王五", "003"));
        aggregate.addStudent(new Student("赵六", "004"));
        
        // 获取迭代器对象
        StudentIterator iterator = aggregate.getStudentIterator();
        // 遍历
        while (iterator.hasNext()) {
            // 获取元素
            Student student = iterator.next();
            System.out.println(student.toString());
        }
    }
}
`;

export const code_zhong_01 = `// 抽象中介者
public abstract class Mediator {
    // 申明一个联络方法
    public abstract void constact(String message, Person person);
}
`;

export const code_zhong_02 = `// 中介机构
public class MediatorStructure extends Mediator {
    // 首先中介结构必须知道所有房主和租房者的信息
    private HouseOwner houseOwner;
    private Tenant tenant;    
    
    public HouseOwner getHouseOwner() {
        return houseOwner;
    }    
    public void setHouseOwner(HouseOwner houseOwner) {
        this.houseOwner = houseOwner;
    }   
        
    public Tenant getTenant() {
        return tenant;
    }     
    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }    
        
    public void constact(String message, Person person) {
        // 如果是房主，则租房者获得信息
        if (person == houseOwner) {
            tenant.getMessage(message);
        } else { // 反正则是房主获得信息
            houseOwner.getMessage(message);
        }
    }
}
`;

export const code_zhong_03 = `// 抽象同事类
public abstract class Person {
    protected String name;
    protected Mediator mediator;
    public Person(String name, Mediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }
}
`;

export const code_zhong_04 = `// 具体同事类 房屋拥有者
public class HouseOwner extends Person {
    public HouseOwner(String name, Mediator mediator) {
        super(name, mediator);
    }    
        
    // 与中介者联系
    public void constact(String message) {
        mediator.constact(message, this);
    }    
        
    // 获取信息
    public void getMessage(String message) {
        System.out.println("房主" + name + "获取到的信息：" + message);
    }
}

// 具体同事类 承租人
public class Tenant extends Person {
    public Tenant(String name, Mediator mediator) {
        super(name, mediator);
    }    
        
    // 与中介者联系
    public void constact(String message) {
        mediator.constact(message, this);
    }
    
    // 获取信息
    public void getMessage(String message) {
        System.out.println("租者" + name + "获取到的信息：" + message);
    }
}
`;

export const code_zhong_05 = `// 测试类
public class Client {
    public static void main(String[] args) {
        // 中介机构
        MediatorStructure mediator = new MediatorStructure(); 

        // 房主和租房者只需要知道中介机构即可
        HouseOwner houseOwner = new HouseOwner("张三", mediator);
        Tenant tenant = new Tenant("李四", mediator);    

        // 中介结构要知道房主和租房者
        mediator.setHouseOwner(houseOwner);
        mediator.setTenant(tenant);    
        
        // 联络
        tenant.constact("我要租三室的房子！！！");
        houseOwner.constact("我这里有三室的房子，你要租吗？");
    }
}
`;

export const code_bei_01 = `public class GameRole {
    private int vit; // 生命力
    private int atk; // 攻击力
    private int def; // 防御力

    // 初始化内部状态
    public void initState() {
        this.vit = 100;
        this.atk = 100;
        this.def = 100;
    }

    // 保存角色状态功能
    public RoleStateMemento saveState() {
        return new RoleStateMemento(vit, atk, def);
    }    
        
    // 恢复角色状态
    public void recoverState(RoleStateMemento roleStateMemento) {
        // 将备忘录对象中存储的状态赋值给当前对象的成员
        this.vit = roleStateMemento.getVit();
        this.atk = roleStateMemento.getAtk();
        this.def = roleStateMemento.getDef();
    }    
        
    // 展示状态功能
    public void stateDisplay() {
        System.out.println("角色生命力：" + vit);
        System.out.println("角色攻击力：" + atk);
        System.out.println("角色防御力：" + def);
    }

    public int getVit() {
        return vit;
    }    
    public void setVit(int vit) {
        this.vit = vit;
    } 
        
    public int getAtk() {
        return atk;
    }    
    public void setAtk(int atk) {
        this.atk = atk;
    }   
        
    public int getDef() {
        return def;
    }    
    public void setDef(int def) {
        this.def = def;
    }

    // 战斗
    public void fight() {
        this.vit = 0;
        this.atk = 0;
        this.def = 0;
    }
}
`;

export const code_bei_02 = `public class RoleStateMemento {
    private int vit; // 生命力
    private int atk; // 攻击力
    private int def; // 防御力
    public RoleStateMemento(int vit, int atk, int def) {
        this.vit = vit;
        this.atk = atk;
        this.def = def;
    }
    public RoleStateMemento() { }

    public int getVit() {
        return vit;
    }    
    public void setVit(int vit) {
        this.vit = vit;
    }
    
    public int getAtk() {
        return atk;
    }    
    public void setAtk(int atk) {
        this.atk = atk;
    }    
    
    public int getDef() {
        return def;
    }    
    public void setDef(int def) {
        this.def = def;
    }
}
`;

export const code_bei_03 = `public class RoleStateCaretaker {
    // 声明RoleStateMemento类型的变量
    private RoleStateMemento roleStateMemento;

    public RoleStateMemento getRoleStateMemento() {
        return roleStateMemento;
    }
    public void setRoleStateMemento(RoleStateMemento roleStateMemento) {
        this.roleStateMemento = roleStateMemento;
    }
}
`;

export const code_bei_04 = `public class Client {
    public static void main(String[] args) {
        System.out.println("---------------大战boss前-----------------");
        // 创建游戏角色对象
        GameRole gameRole = new GameRole();
        gameRole.initState();// 初始化状态操作
        gameRole.stateDisplay();

        // 将该游戏角色内部状态进行备份
        // 创建管理者对象
        RoleStateCaretaker roleStateCaretaker = new RoleStateCaretaker();
        roleStateCaretaker.setRoleStateMemento(gameRole.saveState());

        System.out.println("---------------大战boss后-----------------");
        // 损耗严重
        gameRole.fight();
        gameRole.stateDisplay();

        System.out.println("---------------恢复之前的状态-----------------");
        gameRole.recoverState(roleStateCaretaker.getRoleStateMemento());
        gameRole.stateDisplay();
    }
}
`;

export const code_guan_01 = `// 定义抽象主题类，提供三个方法
public interface Subject {
    // 增加订阅者
    public void attach(Observer observer);
    // 删除订阅者
    public void detach(Observer observer);

    // 通知订阅者更新消息
    public void notify(String message);
}
`;

export const code_guan_02 = `// 微信公众号是具体主题（具体被观察者），存储订阅该公众号的微信用户，并实现了抽象主题中的方法
public class SubscriptionSubject implements Subject {
    // 储存订阅公众号的微信用户
    private List<Observer> weixinUserlist = new ArrayList<Observer>();
    
    @Override
    public void attach(Observer observer) {
        weixinUserlist.add(observer);
    }
    @Override
    public void detach(Observer observer) {
        weixinUserlist.remove(observer);
    }
    
    @Override
    public void notify(String message) {
        for (Observer observer : weixinUserlist) {
            observer.update(message);
        }
    }
}
`;

export const code_guan_03 = `// 定义抽象观察者类，定义一个更新的方法
public interface Observer {
    void update(String message);
}
`;

export const code_guan_04 = `// 定义具体观察者类，微信用户是观察者，实现更新的方法
public class WeixinUser implements Observer {
    // 微信用户名
    private String name;
    public WeixinUser(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println("通知 " + name + " " + message);
    }
}
`;

export const code_guan_05 = `public class Client {
    public static void main(String[] args) {
        SubscriptionSubject mSubscriptionSubject = new SubscriptionSubject();
        // 创建微信用户
        WeixinUser user1 = new WeixinUser("孙悟空");
        WeixinUser user2 = new WeixinUser("猪悟能");
        WeixinUser user3 = new WeixinUser("沙悟净");
        // 订阅公众号
        mSubscriptionSubject.attach(user1);
        mSubscriptionSubject.attach(user2);
        mSubscriptionSubject.attach(user3);
        // 公众号更新发出消息给订阅的微信用户（观察者对象或订阅者）
        mSubscriptionSubject.notify("Java博客更新了");
    }
}
`;

export const code_zhuangtai_01 = `// 抽象状态类
public abstract class LiftState {
    // 定义一个环境角色，也就是封装状态的变化引起的功能变化
    protected Context context;
    public void setContext(Context context) {
        this.context = context;
    }

    // 电梯开门动作
    public abstract void open();
    // 电梯关门动作
    public abstract void close();
    // 电梯运行动作
    public abstract void run();
    // 电梯停止动作
    public abstract void stop();
}
`;

export const code_zhuangtai_02 = `// 开启状态
public class OpenningState extends LiftState {
    // 电梯门打开的动作
    @Override
    public void open() {
        System.out.println("电梯门已开启");
    }    
        
    @Override
    public void close() {
        // 状态修改
        super.context.setLiftState(Context.CLOSING_STATE);
        // 动作委托为CloseState来执行，也就是委托给了ClosingState子类执行这个动作
        super.context.getLiftState().close();
    }    
        
    // 电梯门不能开着就跑，这里什么也不做
    @Override
    public void run() {
        // do nothing
        System.out.println("***电梯门已开启，无法运行");
    }    
        
    // 开门状态已经是停止的了
    @Override
    public void stop() {
        // do nothing
        System.out.println("***电梯已处在停止状态");
    }
}

// 关闭状态
public class ClosingState extends LiftState {    
    @Override
    // 电梯门关闭的动作
    public void close() {
        System.out.println("电梯门已关闭");
    }   
        
    // 在关闭的状态下，电梯门可打开
    @Override
    public void open() {
        super.context.setLiftState(Context.OPENNING_STATE);
        super.context.open();
    }   
        
    // 电梯门已关，正常运行
    @Override
    public void run() {
        super.context.setLiftState(Context.RUNNING_STATE);
        super.context.run();
    }    
        
    // 电梯门关着，我就不按楼层
    @Override
    public void stop() {
        super.context.setLiftState(Context.STOPPING_STATE);
        super.context.stop();
    }
}

// 运行状态
public class RunningState extends LiftState {
    // 电梯正在运行，无法开门的
    @Override
    public void open() {
        // do nothing
        System.out.println("***电梯正在运行，无法开门");
    }   
        
    // 电梯正在运行。电梯门肯定关闭
    @Override
    public void close() {
        // 虽然可以关门，但这个动作不归我执行
        // do nothing
        System.out.println("***电梯门已处在关闭状态");
    }   
        
    // 这是在运行状态下要实现的方法
    @Override
    public void run() {
        System.out.println("电梯正在运行");
    }    
        
    // 正常停止电梯
    @Override
    public void stop() {
        super.context.setLiftState(Context.STOPPING_STATE);
        super.context.stop();
    }
}

// 停止状态
public class StoppingState extends LiftState {   
    // 停止状态，开门，那是要的！
    @Override
    public void open() {
        // 状态修改
        super.context.setLiftState(Context.OPENNING_STATE);
        // 动作委托为CloseState来执行，也就是委托给了ClosingState子类执行这个动作
        super.context.getLiftState().open();
    }   
        
    @Override
    public void close() {
        // 状态修改
        super.context.setLiftState(Context.CLOSING_STATE);
        // 动作委托为CloseState来执行，也就是委托给了ClosingState子类执行这个动作
        super.context.getLiftState().close();
    }   
        
    // 停止状态再跑起来，正常的很
    @Override
    public void run() {
        // 状态修改
        super.context.setLiftState(Context.RUNNING_STATE);
        // 动作委托为CloseState来执行，也就是委托给了ClosingState子类执行这个动作
        super.context.getLiftState().run();
    }    
        
    // 停止状态是怎么发生的呢？当然是停止方法执行了
    @Override
    public void stop() {
        System.out.println("电梯已停止");
    }
}
`;

export const code_zhuangtai_03 = `// 环境角色
public class Context {
    // 定义出所有的电梯状态
    public final static OpenningState OPENNING_STATE = new OpenningState();// 开门状态，这时候电梯只能关闭
    public final static ClosingState CLOSING_STATE = new ClosingState();// 关闭状态，这时候电梯可以运行、停止和开门
    public final static RunningState RUNNING_STATE = new RunningState();// 运行状态，这时候电梯只能停止
    public final static StoppingState STOPPING_STATE = new StoppingState();// 停止状态，这时候电梯可以开门、运行
    // 定义一个当前电梯状态
    private LiftState liftState;    
    
    public LiftState getLiftState() {
        return this.liftState;
    }  
         
    public void setLiftState(LiftState liftState) {
        // 当前环境改变
        this.liftState = liftState;
        // 把当前的环境通知到各个实现类中
        this.liftState.setContext(this);
    }   
        
    public void open() {
        this.liftState.open();
    }   
        
    public void close() {
        this.liftState.close();
    }   
        
    public void run() {
        this.liftState.run();
    }    
        
    public void stop() {
        this.liftState.stop();
    }
}
`;

export const code_zhuangtai_04 = `public class Client {
    public static void main(String[] args) {
        // 创建环境角色对象
        Context context = new Context();

        // 设置当前电梯装填
        context.setLiftState(new ClosingState());
        System.out.println("电梯初始状态为：门关闭");
        context.open();
        context.run();
        context.close();
        context.run();
        context.open();
        context.stop();
    }
}
`;

export const code_ce_01 = `// 抽象策略类
public interface Strategy {
    void show();
}
`;

export const code_ce_02 = `// 定义具体策略角色：每个节日具体的促销活动
// 为春节准备的促销活动A
public class StrategyA implements Strategy {
    public void show() {
        System.out.println("买一送一");
    }
}

// 为中秋准备的促销活动B
public class StrategyB implements Strategy {
    public void show() {
        System.out.println("满200元减50元");
    }
}

// 为圣诞准备的促销活动C
public class StrategyC implements Strategy {
    public void show() {
        System.out.println("满1000元加一元换购任意200元以下商品");
    }
}
`;

export const code_ce_03 = `// 定义环境角色（Context）：用于连接上下文，即把促销活动推销给客户
public class SalesMan {
    // 持有抽象策略角色的引用
    private Strategy strategy;
    public SalesMan(Strategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }

    // 向客户展示促销活动
    public void salesManShow() {
        strategy.show();
    }
}
`;

export const code_ce_04 = `public class Client {
    public static void main(String[] args) {
        System.out.println("=======春节=======");
        // 春节来了，使用春节促销活动
        SalesMan salesMan = new SalesMan(new StrategyA());
        // 展示促销活动
        salesMan.salesManShow();

        System.out.println("=======中秋节=======");
        // 中秋节到了，使用中秋节的促销活动
        salesMan.setStrategy(new StrategyB());
        // 展示促销活动
        salesMan.salesManShow();

        System.out.println("=======圣诞节=======");
        // 圣诞节到了，使用圣诞节的促销活动
        salesMan.setStrategy(new StrategyC());
        // 展示促销活动
        salesMan.salesManShow();
    }
}
`;

export const code_moban_01 = `// 抽象类
public abstract class AbstractClass {
    // 定义模板方法，定义为final固定流程，禁止被重写
    public final void cookProcess() {
        // 第一步：倒油
        this.pourOil();
        // 第二步：热油
        this.heatOil();
        // 第三步：倒蔬菜
        this.pourVegetable();
        // 第四步：倒调味料
        this.pourSauce();
        // 第五步：翻炒
        this.fry();
    }

    // 第一步：倒油
    public void pourOil() {
        System.out.println("倒油");
    }
    // 第二步：热油是一样的，所以直接实现
    public void heatOil() {
        System.out.println("热油");
    }
    // 第三步：倒蔬菜是不一样的（一个下包菜，一个是下菜心）
    public abstract void pourVegetable();
    // 第四步：倒调味料是不一样
    public abstract void pourSauce();
    // 第五步：翻炒是一样的，所以直接实现
    public void fry() {
        System.out.println("炒啊炒啊炒到熟啊");
    }
}
`;

export const code_moban_02 = `// 具体子类
// 炒手撕包菜类
public class ConcreteClass_BaoCai extends AbstractClass {
    @Override
    public void pourVegetable() {
        System.out.println("下锅的蔬菜是包菜");
    }
    @Override
    public void pourSauce() {
        System.out.println("下锅的酱料是辣椒");
    }
}

// 炒蒜蓉菜心类
public class ConcreteClass_CaiXin extends AbstractClass {
    @Override
    public void pourVegetable() {
        System.out.println("下锅的蔬菜是菜心");
    }
    @Override
    public void pourSauce() {
        System.out.println("下锅的酱料是蒜蓉");
    }
}
`;

export const code_moban_03 = `public class Client {
    public static void main(String[] args) {
        System.out.println("=======炒手撕包菜=======");
        ConcreteClass_BaoCai baoCai = new ConcreteClass_BaoCai();
        baoCai.cookProcess();

        System.out.println("=======炒蒜蓉菜心=======");
        ConcreteClass_CaiXin caiXin = new ConcreteClass_CaiXin();
        caiXin.cookProcess();
    }
}
`;

export const code_fang_01 = `// 抽象访问者角色类（这里的方法名称可以更抽象一点，扩展性会更好）
public interface Person {
    // 喂食宠物狗
    void feed(Cat cat);
    // 喂食宠物猫
    void feed(Dog dog);
}
`;

export const code_fang_02 = `// 具体访问者角色类(主人)
public class Owner implements Person {
    public void feed(Cat cat) {
        System.out.println("主人喂食猫");
    }
    public void feed(Dog dog) {
        System.out.println("主人喂食狗");
    }
}

// 具体访问者角色类(其他人)
public class Someone implements Person {
    public void feed(Cat cat) {
        System.out.println("其他人喂食猫");
    }

    public void feed(Dog dog) {
        System.out.println("其他人喂食狗");
    }
}
`;

export const code_fang_03 = `// 抽象元素角色类
public interface Animal {
    // 接受访问者访问的功能
    void accept(Person person);
}
`;

export const code_fang_04 = `// 具体元素角色类（宠物狗）
public class Dog implements Animal {
    public void accept(Person person) {
        person.feed(this); // 访问者给宠物猫喂食
        System.out.println("好好吃，汪汪汪。。。");
    }
}

// 具体元素角色类（宠物猫）
public class Cat implements Animal {
    public void accept(Person person) {
        person.feed(this); // 访问者给宠物猫喂食
        System.out.println("好好吃，喵喵喵。。。");
    }
}
`;

export const code_fang_05 = `// 对象结构类
public class Home {
    // 声明一个集合对象，用来存储元素对象
    private List<Animal> nodeList = new ArrayList<Animal>();    
    
    // 添加元素功能
    public void add(Animal animal) {
        nodeList.add(animal);
    }    
        
    public void action(Person person) {
        // 遍历集合，获取每一个元素，让访问者访问每一个元素
        for (Animal animal : nodeList) {
            animal.accept(person);
        }
    }
}
`;

export const code_fang_06 = `public class Client {
    public static void main(String[] args) {
        // 创建Home对象
        Home home = new Home();
        // 添加元素到Home对象中
        home.add(new Dog());
        home.add(new Cat());

        // 主人喂食
        System.out.println("=== 主人喂食宠物 ===");
        Person owner = new Owner();
        home.action(owner);

        // 其他人喂食
        System.out.println("=== 其他人喂食宠物 ===");
        Person someone = new Someone();
        home.action(someone);
    }
}
`;
