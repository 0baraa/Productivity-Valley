import smtplib
import os

def connect_to_smtp():
    try:
        server = smtplib.SMTP(os.environ.get('EMAIL_HOST'), os.environ.get('EMAIL_PORT'))
        server.login(os.environ.get('EMAIL_FROM_USER'), os.environ.get('EMAIL_HOST_PASSWORD'))
        print("SMTP服务器连接成功！")
        return server
    except Exception as e:
        print("无法连接到SMTP服务器:", e)
        return None

def send_email():
    server = connect_to_smtp()
    if server:
        try:
            # 发送邮件
            server.sendmail(os.environ.get('EMAIL_FROM_USER'), 'recipient@example.com', '这是一封测试邮件')
            print("邮件发送成功！")
        except Exception as e:
            print("邮件发送失败:", e)
        finally:
            # 关闭连接
            server.quit()

if __name__ == "__main__":
    send_email()
