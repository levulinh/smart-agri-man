# Tài liệu sử dụng API #

# USER API

## Đăng ký thành viên mới

> **Đường dẫn:**
>> https://lvl-smart-algae.herokuapp.com/api/register
>
> **Phương thức: POST**
>
> **Parameters:**
>> tên | kiểu | required
>> ----|------|---------
>> email|string|yes
>> phoneNumber|string|yes
>> password|string|yes
>> fullName|string|no
>> address|string|no
>> deviceId|string|no
>
## Đăng nhập thành viên
> **Đường dẫn:**
>> https://lvl-smart-algae.herokuapp.com/api/login
>
> **Phương thức: POST**
>
> **Parameters:**
>> tên | kiểu | required
>> ----|------|---------
>> emailOrPhone|string|yes
>> password|string|yes
>
## Sửa thông tin thành viên
> **Đường dẫn:**
>> https://lvl-smart-algae.herokuapp.com/api/user
>
> **Phương thức: PUT**
>
> **Parameters:**
>> tên | kiểu | required
>> ----|------|---------
>> id|string|yes
>> fullName|string|no
>> address|string|no
>> deviceId|string|no
>