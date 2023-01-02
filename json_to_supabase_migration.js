const { createClient } = require('@supabase/supabase-js')
var fs = require('fs');

const supabase = createClient('https://aehipnblgakbmbilvbzs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaGlwbmJsZ2FrYm1iaWx2YnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1MjYyMjUsImV4cCI6MTk4ODEwMjIyNX0.cCDg4A9kXBV1YgTCIw3cCuDC843QzoGUcPjkNmzHmdk')

// console.log(supabase)

async function insertrows(rows){
    const { error } = await supabase
        .from('baseproducts')
        .insert(rows)
    console.log(error)
}

setTimeout(async() => {

    var rawdata = JSON.parse(fs.readFileSync('./results/data.json', 'utf8'));
    let rows = []
    for(let i=0; i < rawdata.length;i++){

        let large_img = rawdata[i]['image_large']
        let small_img = rawdata[i]['image_small']
        let j = {
            name: rawdata[i]['Product'],
            brand: rawdata[i]['Brand'],
            category_1: rawdata[i]['category_1'],
            category_2: rawdata[i]['category_2'],
            category_3: rawdata[i]['category_3'],
            images: [large_img, small_img],
            quantity: rawdata[i]['Quantity'],
            price: rawdata[i]['Price'],
            mrp: rawdata[i]['Mrp'],
            variants: [{}],
            description: '',
            rating: 0,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString(),
            bb_link: rawdata[i]['link']
        }
        rows.push(j);
    }

    await insertrows(rows);
    fs.writeFileSync('./results/supabase_baseproducts.json', JSON.stringify(rows));
    
    console.log('done pushing all rows to db')

}, 3*1000)

