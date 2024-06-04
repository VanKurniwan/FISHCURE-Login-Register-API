# Guide menggunakan API LOGIN & REGISTER 🔒🔑:

Base url : wait for deployment

---

## Register

url

```
/register
```

request payload data :

```
{
    "email" : "[user email]",
    "password" : "[user password]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "User berhasil ditambahkan",
    "data": {
        "email": "[email user]"
    }
}
```

- ketika email sudah digunakan :

```
{
    "status": "failed",
    "message": "Email sudah digunakan"
}
```

---

## Login

url

```
/login
```

request payload data :

```
{
    "email" : "[user email]",
    "password" : "[user password]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "User berhasil login",
    "data": {
        "email": "[email user]"
    }
}
```

- ketika gagal :

```
{
    "status": "failed",
    "message": "Email atau Password yang dimasukkan salah"
}
```

---

## Mengirim kode OTP ke email user

url

```
/sendOtp
```

request payload data :

```
{
    "password" : "[user password]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Kode OTP berhasil dikirimkan",
    "data": {
        "otp": "[kode otp user]"
    }
}
```

- ketika email belum melakukan register :

```
{
    "status": "failed",
    "message": "Email yang anda masukkan belum melakukan register"
}
```

---

## Melakukan autentikasi kode OTP user

url

```
/authOtp
```

request payload data :

```
{
    "email" : "[user email]",
    "otp" : "[user otp code]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Kode OTP telah sesuai",
    "data": {
        "email": "[email user]"
    }
}
```

- ketika kode otp tidak sesuai :

```
{
    "status": "failed",
    "message": "Kode yang anda masukkan salah"
}
```

---

## Ganti password user

url

```
/updatePassword
```

request payload data :

```
{
    "email" : "[user email]",
    "newPassword" : "[user new password]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Password berhasil diperbarui",
    "data": {
        "email": "[email user]"
    }
}
```
