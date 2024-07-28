/** @type {import('next').NextConfig} */

import  withImages  from "next-images";

const nextConfig = {
    images: {
        unoptimized: false
    }
};

export default withImages(nextConfig)