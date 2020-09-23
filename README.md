# Nova's Inventory

## Project setup
```
npm install
npm run build
npx cap add android
```

## Required Files
/src/credentials.json
Example:
```
{
    "local": "http://localhost/api/novaInventory.php",
    "live": "https://www.yoursite.com/api/novaInventory.php"
}
```

## API file
Move the /src/api/novaInventory.php into your local or live server

## MySQL Database
```
CREATE DATABASE novatracker;
```

```
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `alerts` int(11) NOT NULL,
  `role` varchar(30) NOT NULL,
  `user_image` mediumblob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
```

```
CREATE TABLE IF NOT EXISTS `item_collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `item_description` varchar(255) NOT NULL,
  `item_quantity` int(11) NOT NULL,
  `item_image` mediumblob NOT NULL,
  `low_stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Serve to Android Studio
```
npm run build
npx cap copy
npx cap open android
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
