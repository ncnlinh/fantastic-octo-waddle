## Account
### Create Account

[Docs](https://www.gomo.do/the-heavy-stuff.html#tag/%2Fpaths%2F~1account~1create%2Fpost)
`GET http://localhost:3000/modo/account/create`

- Example request:
```
{
    "type": "paypal",
    "email": "nhatlinh95@gmail.com"
}
```

- Example response:
```
{
  "status_code": 1,
  "response_data": {
    "account": "paypal_a533bc88-54f0-437e-8429-0ab8c1fd8c57",
    "balance": 2000
  },
  "call_reference": "zqCsRR0Y3YN9CLLay+qRZg"
}
```