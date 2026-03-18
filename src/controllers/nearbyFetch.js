

export const nearbyFetch = async(req, res)=>{
    const {query, lat, lon} = req.query;
    
    try{
        if(!lat || !lon || !query) return res.json({message: "No query params or lat, lon recieved"});
        
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&bounded=1&viewbox=${lonNum - 0.02},${latNum + 0.02},${lonNum + 0.02},${latNum - 0.02}`,{
            headers:{"User-Agent": "sos-beacon"}
        });
        const data = await response.json();
        //  console.log(data);
       return  res.status(200).json(data);
       


    }catch(error){
        res.status(500).json({error: "Geofetching failed/cors policy violation/Too much requests"+ error.message})
    }
}