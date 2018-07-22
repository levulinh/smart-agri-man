# Tài liệu sử dụng API #

# USER API

## Đăng ký thành viên mới

> **Đường dẫn:**
>> https://smart-agri-man.herokuapp.com/api/register
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
> **Trả về**
>
><code>{
    "__v": 0,
    "updatedAt": "2018-07-22T04:06:22.127Z",
    "createdAt": "2018-07-22T04:06:22.127Z",
    "phoneNumber": "+84123456789",
    "hash": "hidden",
    "email": "abc@gmail.com",
    "_id": "5b5402be5f75cf00148e72a7",
    "error": false
}</code>
## Đăng nhập thành viên
> **Đường dẫn:**
>> https://smart-agri-man.herokuapp.com/api/login
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
>> https://smart-agri-man.herokuapp.com/api/user
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
