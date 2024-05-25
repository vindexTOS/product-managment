<?php

namespace App\Models;

use App\Models\Image;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price'];

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function productMetaDatas()
    {
        return $this->hasMany(ProductMetaData::class);
    }
}
