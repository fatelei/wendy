wendy
=====

Wendy is a web service, used to make long url to be short

## Dependencies
```
mysql
```
- - -

## Install
```
$ git clone git://github.com/fatelei/wendy.git
$ ./install.sh
```

## Database setup
```
1. Make sure you have installed mysql-server, then you can change the directory to db by using command: cd db
2. Enter the mysql shell, then execute command: source wendy.sql, it will help you create database and table
```
## Database Configure
```
The main configure locates at ./config/config.json, it includes configure of database, you can change the settings of
database by youself, if you need do it.s
```

## Server Hostname configure
```
The default hostname is localhost in the config.json, you should modify it, when you use it in the production.
```



## Test
```
make test
```

- - -

## APIs

### Short long url
```
GET /shorturl
```

#### Parameters
```
url: The long url
```

#### Example Input
```
{
	"url": "http://this.is.a.long.url"
}
```

#### Response
```
{
	"short": "http://short.com/foo"
}
```