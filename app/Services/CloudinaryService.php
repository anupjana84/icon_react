<?php

namespace App\Services;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;

class CloudinaryService
{
    /**
     * Upload an image to Cloudinary with a specific file path.
     *
     * @param mixed $file
     * @param string $folderPath
     * @return string
     */
    public function uploadImage($file, $folderPath = 'icon_computer')
    {

            // Check if the file exists locally before uploading
            
        // Step 1: Save the file locally in the 'public' disk
        $localPath = $file->store('uploads/temp', 'public');

        // Step 2: Get the full path of the stored file
        $filePath = storage_path('app/public/' . $localPath);
        // dd($filePath);
        // if (!file_exists($filePath)) {
        //     dd("File not found at path: {$filePath}");
        // }
        // Step 3: Upload the local file to Cloudinary
        $uploadedFileUrl = Cloudinary::upload(
            $filePath,
            [
                'folder' => $folderPath,
                'transformation' => [
                    [
                        'width' => 400,
                        'height' => 300,
                        'crop' => 'limit',
                    ],
                ],
                'fetch_format' => 'auto', // Automatically convert to the most optimized format (e.g., WebP, AVIF)
                'quality' => 'auto:best',
            ]
        )->getSecurePath();
        

        // Step 4: Delete the local file after successful upload to Cloudinary
        Storage::disk('public')->delete($localPath);

        return $uploadedFileUrl;
    }

    public function deleteImage($url)
    {
        // Parse the URL and extract the path
        $path = parse_url($url, PHP_URL_PATH);
        
        // Remove the leading slash and split the path into segments
        $pathParts = explode('/', ltrim($path, '/'));
    
        // The public ID starts after the 'upload/v[version]' segment
        // Check if we have enough parts and locate the 'upload' segment
        $uploadIndex = array_search('upload', $pathParts);
    
        // Ensure we found the upload segment and there is a version following it
        if ($uploadIndex !== false && isset($pathParts[$uploadIndex + 1])) {
            // Join the remaining parts to form the public ID
            $publicIdWithExtension = array_slice($pathParts, $uploadIndex + 2);
            $publicId = implode('/', $publicIdWithExtension);
            
            // Remove the file extension (e.g., .jpg, .png)
            $publicId = preg_replace('/\.[^.]+$/', '', $publicId);
        //    dd($publicId);
            // Delete the image using Cloudinary's destroy method
            $result = Cloudinary::destroy($publicId);
            
            return $result;
        }
    
        return null; // Return null or handle error if public ID extraction fails
    }
    

}
