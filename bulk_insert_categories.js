
const { createClient } = require('@supabase/supabase-js')
var fs = require('fs');
const events = require('events');
const readline = require('readline');

const supabase = createClient('https://aehipnblgakbmbilvbzs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaGlwbmJsZ2FrYm1iaWx2YnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1MjYyMjUsImV4cCI6MTk4ODEwMjIyNX0.cCDg4A9kXBV1YgTCIw3cCuDC843QzoGUcPjkNmzHmdk')

// console.log(supabase)

async function insertrows(rows){
    const { error } = await supabase
        .from('basecategories')
        .insert(rows)
    console.log(error)
}


setTimeout(async() => {

    
    (async function processLineByLine() {

        let rows = []
        try {
          const rl = readline.createInterface({
            input: fs.createReadStream('./results/categories_raw_wo_duplicates.csv'),
            crlfDelay: Infinity
          });
      
          rl.on('line', (line) => {
            // console.log(`${line}`)
            let c1_imgurl = '';
            let c1_color = '';
            if(line.split(',')[1] == 'baby-care'){
              c1_imgurl = ''
              c1_color = ''
            }else if(line.split(',')[1] == 'cleaning-household'){
              c1_imgurl = ''
              c1_color = ''
            }else if(line.split(',')[1] == 'eggs-meat-fish'){
              c1_imgurl = ''
              c1_color = '#FFEEEA'                                                     
            }else if(line.split(',')[1] == 'beverages'){
              c1_imgurl = ''
              c1_color = ''
            }else if(line.split(',')[1] == 'foodgrains-oil-masala'){
              c1_imgurl = ''
              c1_color = ''
            }else if(line.split(',')[1] == 'beauty-hygiene'){
              c1_imgurl = ''
              c1_color = ''
            }else if(line.split(',')[1] == 'gourmet-world-food'){
              c1_imgurl = ''
              c1_color = ''
            }else if(line.split(',')[1] == 'snacks-branded-foods'){
              c1_imgurl = ''
              c1_color = ''
            }else if(line.split(',')[1] == 'fruits-vegetables'){
              c1_imgurl = 'https://aehipnblgakbmbilvbzs.supabase.co/storage/v1/object/sign/images/c1/veggie?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYzEvdmVnZ2llIiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNjkyNTk4LCJleHAiOjE5ODgwNTI1OTh9.sMTPz9Ksbh4KhYHkvsT4VoBZ3eKe14NAeR2vugHzDtc'
              c1_color = '#E5FCE3'
            }else if(line.split(',')[1] == 'kitchen-garden-pets'){
              c1_imgurl = ''
              c1_color = ''
            }else if(line.split(',')[1] == 'bakery-cakes-dairy'){
              c1_imgurl = ''
              c1_color = ''
            }else{
              console.log('no c1 here')
            }

            try{

                if(line.split(',')[0] != ''){
                    let obj = {
                        c1_meta: line.split(',')[1],
                        c1_title: line.split(',')[2],
                        c1_imgurl: c1_imgurl,
                        c1_color: c1_color,
                        c2_meta: line.split(',')[4],
                        c2_title: line.split(',')[5],
                        c2_imgurl: line.split(',')[6],
                        c3_meta: line.split(',')[7],
                        c3_title: line.split(',')[8],
                        c3_imgurl: line.split(',')[9],
                        created_at: new Date(Date.now()).toISOString()
                    }
                    rows.push(obj);
                }

            }catch(e){
                console.log(e)
            }
            
          });
      
          await events.once(rl, 'close');
          await insertrows(rows);
          console.log('Reading file line by line with readline done.');
          const used = process.memoryUsage().heapUsed / 1024 / 1024;
          console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        } catch (err) {
          console.error(err);
        }
    })();

}, 3*1000)