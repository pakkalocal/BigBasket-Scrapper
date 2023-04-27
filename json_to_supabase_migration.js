const { createClient } = require('@supabase/supabase-js')
var fs = require('fs');

const supabase = createClient('https://aehipnblgakbmbilvbzs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaGlwbmJsZ2FrYm1iaWx2YnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1MjYyMjUsImV4cCI6MTk4ODEwMjIyNX0.cCDg4A9kXBV1YgTCIw3cCuDC843QzoGUcPjkNmzHmdk')

// console.log(supabase)

async function insertrows(rows){
    const { error } = await supabase
        .from('gbox_products')
        .insert(rows)
    console.log(error)
}

setTimeout(async() => {

    var rawdata = JSON.parse(fs.readFileSync('./results/data.json', 'utf8'));
    let rows = []
    for(let i=0; i < rawdata.length;i++){

        let large_img = rawdata[i]['image_large']
        let small_img = rawdata[i]['image_small']

        let price = rawdata[i]['Price']
        let mrp = rawdata[i]['Mrp']
        if(price.includes('MRP') && mrp == ''){
            price = parseFloat(price.split('Rs')[1].trim())
            mrp = price
        }else{
            price = parseFloat(price.split('Rs')[1].trim())
            mrp = parseFloat(mrp.split('Rs')[1].trim())
        }
        
        let discount_flat = mrp - price;
        let discount_percent = ((mrp - price)/mrp) * 100;

        let j = {
            name: rawdata[i]['Product'],
            brand: rawdata[i]['Brand'],
            c1_meta: rawdata[i]['category_1'],
            c2_meta: rawdata[i]['category_2'],
            c3_meta: rawdata[i]['category_3'],
            quantity: rawdata[i]['Quantity'],
            price: price,
            mrp: mrp,
            images: [large_img, small_img],
            large_img: large_img,
            small_img: small_img,
            variants: [],
            description: '',
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString(),
            bb_link: rawdata[i]['link'],
            rating: 0,
            no_of_ratings: 0,
            reviews: 0,
            recommendations: 0,
            discount_percent: discount_percent,
            discount_flat: discount_flat
        }
        rows.push(j);
    }

    await insertrows(rows);
    fs.writeFileSync('./results/supabase_baseproducts.json', JSON.stringify(rows));
    
    console.log('done pushing all rows to db')

}, 3*1000)

