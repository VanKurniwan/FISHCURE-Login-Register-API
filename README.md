# Guide menggunakan API LOGIN & REGISTER 🔒🔑:

Base url : ?

---

## Register

```
/register?email=[email user]&password=[password user]
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

```
/login?email=[email user]&password=[password user]
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

```
/sendOtp?email=[email user]
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

```
/authOtp?email=[email user]&otp=[kode otp user]
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

```
/updatePassword?email=[email user]&newPassword=[password baru user]
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
