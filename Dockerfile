# 1. For build React app
FROM node:16-alpine AS development


# Set environment variables
ENV APP_CONFIG_IP_ROOT=https://api.hvpnvn.edu.vn/
ENV APP_CONFIG_ONE_SIGNAL_ID=f3857a81-2891-49be-87a7-903a4a1a54be
ENV APP_CONFIG_SENTRY_DSN=https://ed934e521d476c44a89a42aaa8a6993a@sentry.aisoftech.vn/3
ENV APP_CONFIG_KEYCLOAK_AUTHORITY=https://sso.hvpnvn.edu.vn/realms/vwa
ENV APP_CONFIG_PREFIX_OF_KEYCLOAK_CLIENT_ID=vwa-
ENV APP_CONFIG_APP_VERSION=241218.1100

ENV APP_CONFIG_CO_QUAN_CHU_QUAN='HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG'
ENV APP_CONFIG_TEN_TRUONG='VIỆN KHOA HỌC KỸ THUẬT BƯU ĐIỆN'
ENV APP_CONFIG_TIEN_TO_TRUONG='Học viện'
ENV APP_CONFIG_TEN_TRUONG_VIET_TAT_TIENG_ANH=RIPT
ENV APP_CONFIG_PRIMARY_COLOR=#CC0D00

ENV APP_CONFIG_URL_LANDING=https://hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CONNECT=https://sinhvien.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CAN_BO=https://canbo.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_DAO_TAO=https://qldt.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_NHAN_SU=https://tcns.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_TAI_CHINH=https://taichinh.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CTSV=https://ctsv.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_QLKH=https://qlkh.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_VPS=https://vanphong.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_KHAO_THI=https://khaothi.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CORE=https://core.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_CSVC=https://csvc.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_THU_VIEN=https://thuvien.hvpnvn.edu.vn/
ENV APP_CONFIG_URL_QLVB=https://sso.hvpnvn.edu.vn/realms/vwa/protocol/openid-connect/auth?response_type=token&client_id=vwa-odoo-qlvb&redirect_uri=http%3A%2F%2Fqlvb.hvpnvn.edu.vn%2Fauth_oauth%2Fsignin&scope=profile+openid+email&state=%7B%22d%22%3A+%22qlvb1%22%2C+%22p%22%3A+4%2C+%22r%22%3A+%22http%253A%252F%252Fqlvb.hvpnvn.edu.vn%252Fweb%22%7D

ENV APP_CONFIG_TITLE_LANDING='Cổng thông tin'
ENV APP_CONFIG_TITLE_CONNECT='Slink'
ENV APP_CONFIG_TITLE_CAN_BO='Cổng cán bộ'
ENV APP_CONFIG_TITLE_DAO_TAO='Quản lý đào tạo'
ENV APP_CONFIG_TITLE_NHAN_SU='Tổ chức nhân sự'
ENV APP_CONFIG_TITLE_TAI_CHINH='Thanh toán'
ENV APP_CONFIG_TITLE_CTSV='Công tác sinh viên'
ENV APP_CONFIG_TITLE_QLKH='Quản lý khoa học'
ENV APP_CONFIG_TITLE_VPS='Văn phòng số'
ENV APP_CONFIG_TITLE_KHAO_THI='Khảo thí'
ENV APP_CONFIG_TITLE_CORE='Danh mục chung'
ENV APP_CONFIG_TITLE_CSVC='Cơ sở vật chất'
ENV APP_CONFIG_TITLE_THU_VIEN='Thư viện'
ENV APP_CONFIG_TITLE_QLVB='Quản lý văn bản'


# Set working directory
WORKDIR /app

COPY package.json /app/
RUN yarn install

COPY . /app

FROM development AS build
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/website

RUN rm -rf ./*
COPY --from=build /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
