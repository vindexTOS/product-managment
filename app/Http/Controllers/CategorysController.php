<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use Illuminate\Validation\ValidationException;

class CategorysController extends Controller
{
    public function store(Request $request)
    {
        $messages = [
            'category.required' => 'The category field is required.',
        ];

        $validatedData = $request->validate(
            [
                'category' => 'required',
            ],
            $messages
        );

        $category = $validatedData['category'];

        $isCategoryExist = Category::where('name', $category)->exists();

        if ($isCategoryExist) {
            throw ValidationException::withMessages([
                'category' => 'Category already exists.',
            ]);
        }
        $isCategoryExist = Category::where('name', $category)->first();

        Category::create([
            'name' => $validatedData['category'],
        ]);

        return response()->json(
            [
                'message' => 'Category created successfully!',
                'category' => $category,
            ],
            201
        );
    }

    public function show(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');

        $categories = Category::where(
            'name',
            'like',
            '%' . $search . '%'
        )->paginate($perPage);

        return response()->json($categories, 200);
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found.'], 404);
        }

        $category->delete();

        return response()->json(
            ['message' => 'Category deleted successfully.'],
            200
        );
    }
}
