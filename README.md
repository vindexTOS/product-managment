# Get Started

### step 1 : clone the repo

```
git clone https://github.com/vindexTOS/product-managment.git
```

### step 2: install deps

Go to projects directory

```
composer install

npm install
```

### step 3: set up env

change database connection for your envirment

```
DB_CONNECTION=mariadb
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=YOUR_DATABAE
DB_USERNAME=root
DB_PASSWORD=


```

### step 4: Seeding data base with 100k fake data

- run seeding
  it might take a while depending your hard drive capebility

```
php artisan db:seed --class=ProductSeeder
```

# About app

### Technologies used

- Laravel
- MarianDb
- React
- Ant Design
- TanStack Query
- Inertia
