<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use Inertia\Controller;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ProductMetaData;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    //   make  product
    public function store(Request $request)
    {
        try {
            $messages = [
                'name.required' => 'The name field is required.',
                'description.required' => 'The description field is required.',
                'price.required' => 'The price field is required.',
            ];

            $validatedData = $request->validate(
                [
                    'name' => 'required',
                    'description' => 'required',
                    'price' => 'required',
                    'images' => 'required',
                ],
                $messages
            );

            $product = Product::create([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'price' => $validatedData['price'],
            ]);

            $categories = json_decode($request->input('categories'), true);

            foreach ($categories as $category) {
                ProductMetaData::create([
                    'product_id' => $product->id,
                    'category_id' => $category['id'],
                ]);
            }
            $images = $request->file('images');

            foreach ($images as $image) {
                $imageName = $image->store('images', 'public');

                Image::create([
                    'url' => $imageName,
                    'product_id' => $product->id,
                ]);
            }

            return response()->json(
                [
                    'message' => 'Product Was Created!',
                    'category' => $category,
                ],
                201
            );
        } catch (\Throwable $th) {
            Log::error('An error occurred: ' . $th->getMessage());
        }
    }
    //  get all the products
    public function show(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');

        try {
            $data = Product::with(['images', 'productMetaDatas.category'])
                ->where('name', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->paginate($perPage);
            // dd($data); // Inspect the retrieved data
            return response()->json(
                [
                    'data' => $data,
                ],
                200
            );
        } catch (\Throwable $th) {
            Log::error('An error occurred: ' . $th->getMessage());
        }
    }

    // show single image
    public function showImage($filename)
    {
        $path = 'public/images/' . $filename;
        if (Storage::exists($path)) {
            $file = Storage::get($path);
            $type = Storage::mimeType($path);

            return response($file, 200)->header('Content-Type', $type);
        }

        return response()->json(['error' => 'Image not found'], 404);
    }
    //   get single product
    public function showSingleProduct($id)
    {
        try {
            $product = Product::with([
                'images',

                'productMetaDatas.category',
            ])->find($id);
            if (!$product) {
                return response()->json(['error' => 'Product not found'], 404);
            }

            return response()->json(['data' => $product], 200);
        } catch (\Throwable $th) {
            Log::error('An error occurred: ' . $th->getMessage());
        }
    }
    // delete product

    public function destroy($id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['error' => 'Product not found.'], 404);
            }
            $product->delete();

            return response()->json(
                ['message' => 'Product deleted successfully.'],
                200
            );
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
