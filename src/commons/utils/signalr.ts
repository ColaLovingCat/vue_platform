import { logger } from "@/commons/utils/logger";
const log = logger.create("SignalR");

import * as signalR from "@microsoft/signalr";

class SignalRService {
  public isActive = false;
  private connection: signalR.HubConnection | null = null;

  private listener: ((msg: string) => void) | null = null;
  private afterStart: (() => void) | null = null;

  async startConnection(host: string): Promise<void> {
    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(host + "/chatHub", {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.connection.on("ReceiveMessage", (msg: any) => {
        log.log("ReceiveMessage");
        if (this.listener) {
          this.listener(msg);
        }
      });

      this.connection.onclose(() => {
        log.log("Closed");
        this.isActive = false;
      });

      try {
        await this.connection.start();
        log.log("Connected");
        this.isActive = true;
        if (this.afterStart) {
          this.afterStart();
        }
      } catch (err) {
        log.error("Error while starting connection: " + err);
        this.connection = null;
      }
    }
  }

  async restartCon() {
    if (this.connection) {
      try {
        await this.connection.start();
        log.log("Connected");
        this.isActive = true;
      } catch (err) {
        log.error("Error while starting connection: " + err);
        this.connection = null;
      }
    }
  }

  async stopConnection(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.stop();
        log.log("Disconnected");
        this.isActive = false;
      } catch (err) {
        log.error("Error while stopping connection: " + err);
      } finally {
        this.connection = null;
      }
    }
  }

  async sendMessage(message: any): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.invoke("SendMessage", message);
        log.log("SendMessage");
      } catch (err) {
        log.error("Error while sending message: " + err);
      }
    } else {
      log.error("No active connection to send message");
    }
  }

  setListener(callback: (msg: string) => void): void {
    this.removeListener();
    this.listener = callback;
  }

  removeListener(): void {
    this.listener = null;
  }

  setAfterStart(callback: () => void): void {
    this.removeAfterStart();
    this.afterStart = callback;
  }

  removeAfterStart(): void {
    this.afterStart = null;
  }
}

const signalRServiceInstance = new SignalRService();

export default signalRServiceInstance;
