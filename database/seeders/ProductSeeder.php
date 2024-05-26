<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 100000; $i++) {
            $name = $faker->sentence(3);
            $description = $faker->text(200);
            $price = $faker->randomFloat(2, 1, 1000);

            $productId = DB::table('products')->insertGetId([
                'name' => $name,
                'description' => $description,
                'price' => $price,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('images')->insert([
                'url' => 'images/default-product-image.png',
                'product_id' => $productId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $categoryIds = range(1, 5);
            shuffle($categoryIds);
            $selectedCategoryIds = array_slice($categoryIds, 0, rand(1, 3));

            foreach ($selectedCategoryIds as $categoryId) {
                DB::table('product_meta_data')->insert([
                    'product_id' => $productId,
                    'category_id' => $categoryId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
