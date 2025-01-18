/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "vehicle-images.dealerinspire.com",
                port:"",
            } ,
            {
                protocol: "https",
                hostname: "www.exoticmotorsportsok.com",
                port: "",
            }, 
            {
                protocol: "https",
                hostname: "www.formulaimports.com", 
                port: "",
            }, 
            {
                protocol: "https",
                hostname: "content.homenetiol.com", 
                port: "",
            },
            {
                protocol: "https",
                hostname: "www.selectjeeps.com",
                port: "",
            }, 
            {
                protocol: "https",
                hostname: "www.momentummotorcars.com",
                port: "",
            }, 
            {
                protocol: "https",
                hostname: "cfwww.hgreg.com", 
                port: "",
            }, 
            {
                protocol: "https",
                hostname: "i.ytimg.com",
                port: "",
            }, 
            {
                protocol: "https",
                hostname: "www.perfectautocollection.com",
                port: "",
            }
        ]
    }
};

export default nextConfig;
