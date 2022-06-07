<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;


class CategoryController extends Controller
{
    //

    public function store(Request $request)
    {

        
        $validatedData = $request->validate([
            'category' => 'required',
        ]);

        $project = Category::create([
            'name' => $validatedData['category'],
            'created_by'=>1
        ]);

        return response()->json('Category created!');
    }
    public function index(Request $request)
    {        
      
        $project = Category::orderBy('id', 'DESC')->get();
        return response()->json($project);

    }

    public function destroy($id){

        $res = Category::where('id',$id)->delete();
        return response()->json("Your Data has been deleted");

    }
    public function edit($id){

        $res = Category::find($id);
        return response()->json($res);

    }
    public function update(Request $request,$id){

        $res = Category::find($id);
        $res->name = $request->category;
        $res->save();
        return response()->json(['msg', 'Data has been updated successfully']);

    }


}
