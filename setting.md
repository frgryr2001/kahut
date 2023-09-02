Đây là một dự án **Ứng dụng hệ thống trắc nghiệm tưởng tự kahoot xây dựng bằng công nghệ React Native** mới, được khởi tạo bằng [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Bắt Đầu

> **Lưu ý**: Đảm bảo bạn đã hoàn thành các hướng dẫn [Cài đặt môi trường React Native](https://reactnative.dev/docs/environment-setup) cho đến bước "Tạo một ứng dụng mới" trước khi tiếp tục.Và đảm bảo bạn đã cài đặt [Node.js](https://nodejs.org/en/download/) phiên bản >= 16 .

## Bước 1: Clone dự án này

```bash
git clone https://github.com/frgryr2001/kahut.git
# Hoặc đã có src code trên máy tính của bạn thì chỉ cần unzip file src code và cd vào thư mục src code đó là được
```

## Bước 2: Cài đặt các thư viện

```bash
cd kahut
npm install
// or yarn install
```

## Bước 3 : Cài đặt biến môi trường cho project

```bash
touch .env
```

Sau đó, bạn cần thêm các biến môi trường sau vào file `.env`:

```bash
# API URL
API_URL=<YOUR_API_URL>

# Google OAuth Client ID
WEB_CLIENT_ID=<YOUR_GOOGLE_OAUTH_CLIENT_ID>
```

## Bước 4: Khởi động Metro Server

Trước tiên, bạn cần khởi động **Metro**, trình _bundler_ JavaScript đi kèm với React Native.

Để bắt đầu Metro, chạy lệnh sau từ thư mục _gốc_ của dự án React Native của bạn:

````bash
# Sử dụng npm
npm start

# HOẶC sử dụng Yarn
yarn start


## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
````

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

> **Lưu ý** - Nếu bạn muốn chạy ứng dụng trên một thiết bị thật, hãy tham khảo [Running On Device](https://reactnative.dev/docs/running-on-device) hướng dẫn.

# Các chức năng chính

- Đăng nhập bằng tài khoản Google
- Tạo phòng trắc nghiệm
- Tham gia phòng trắc nghiệm
- Xem kết quả trắc nghiệm
- Xem lịch sử trắc nghiệm
- Xem thông tin cá nhân
- Đăng xuất

# Troubleshooting

## 1. `error Failed to install the app. Make sure you have the Android development environment set up: https://reactnative.dev/docs/environment-setup`

> **Lưu ý** - Đảm bảo bạn đã hoàn thành các hướng dẫn [Cài đặt môi trường React Native](https://reactnative.dev/docs/environment-setup) cho đến bước "Tạo một ứng dụng mới" trước khi tiếp tục.

## 2. `error Failed to launch emulator. Reason: No emulators found as an output of `emulator -list-avds`.`

> **Lưu ý** - Đảm bảo bạn đã cài đặt và khởi chạy một máy ảo Android trước khi tiếp tục.

## 3.Trong quá trình phát triển React-Native, có nhiều bộ nhớ đệm được sử dụng khi xây dựng ứng dụng :

```bash
# Xóa bộ nhớ đệm của Metro
npm start -- --reset-cache

# Xóa bộ nhớ đệm của Gradle
cd android && ./gradlew clean && cd ..
```
