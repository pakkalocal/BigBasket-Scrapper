
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
            input: fs.createReadStream('./results/links.txt'),
            crlfDelay: Infinity
          });
      
          rl.on('line', (line) => {
            let f, cats, cat1, cat2, cat3;
            try{
                f = line.split('pc/')[1].split('/?')[0]
                cats = f.split('/')

                cat1 = (cats[0] != undefined) ? cats[0] : ''
                cat2 = (cats[1] != undefined) ? cats[1] : ''
                cat3 = (cats[2] != undefined) ? cats[2] : ''
                // console.log(`${cat1} -> ${cat2} -> ${cat3}`)

                let obj = {
                    c1_meta: cat1,
                    c1_title: makeTitle(cat1),
                    c1_imgurl: '',
                    c2_meta: cat2,
                    c2_title: makeTitle(cat2),
                    c2_imgurl: '',
                    c3_meta: cat3,
                    c3_title: makeTitle(cat3),
                    c3_imgurl: '',
                }
                rows.push(obj);
            }catch(e){
                console.log(e)
            }
            
          });
      
          await events.once(rl, 'close');
        //   console.log(`${JSON.stringify(rows)}`)
          fs.writeFileSync('./results/basecategories.json', JSON.stringify(rows));
          console.log('Reading file line by line with readline done.');
          const used = process.memoryUsage().heapUsed / 1024 / 1024;
          console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        } catch (err) {
          console.error(err);
        }
    })();

}, 3*1000)

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function makeTitle(string){
    let title = '';
    let arr = string.split('-')
    arr.forEach((s) => {
        title += capitalizeFirstLetter(s) + ' '
    })
    return title.trimEnd();
}