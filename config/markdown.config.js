/**
 * 该配置文件旨在：
 * 1. 生成文章对应的data数组
 * 2. 生成readme
 */

const fs = require('fs');
const path = require('path');

const {
    promisify
} = require('util');

const readline = require('readline');

// Object.keys(fs).forEach((key) => {
//     if (typeof fs[key] === 'function') {
//         fs[key] = util.promisify(fs[key]);
//     }
// });

const data = [];

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function readAllFile(dirPath, sec) {
    let files = await readdir(dirPath);
    for (let file of files) {
        let directoryPath = path.join(dirPath, file);
        let stats = await stat(directoryPath);
        if (stats.isDirectory()) {
            await readAllFile(directoryPath, file)
        } else {
            let obj = {};
            obj[sec] = {
                title: file,
                createTime: (stats.ctime).toLocaleString()
            }
            data.push(obj);
        }
    }
  
    return data;
}

readAllFile(path.resolve('src/markdown')).then(res => {
    fs.writeFileSync(path.resolve('src/data/data.json'), JSON.stringify(res));

    // 整理README
    let markdownContent = ""
    
    res.forEach(item => {
        const d = (Object.keys(item))[0];
        const title = item[d].title.slice(0, -3);
        markdownContent += `[${title}](http://www.kuangdancoding.com/articles/${d}/${encodeURIComponent(title)})
        \r` 
    })

    fs.writeFileSync("./README.md", markdownContent)
}).catch(err => {
    console.log('err', err);
})




