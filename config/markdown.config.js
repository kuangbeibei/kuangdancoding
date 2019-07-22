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
    console.log('res', res);
    fs.writeFileSync(path.resolve('src/data/data.json'), JSON.stringify(res));

    // 整理README
    let markdownContent = ""
    
    res.forEach(item => {
        const d = (Object.keys(item))[0];
        const title = item[d].title.slice(0, -3);
        markdownContent += `[${title}](http://www.kuangdancoding.com/articles/${d}/${title})
        \r` 
    })
    fs.writeFileSync("./README.md", markdownContent)
}).catch(err => {
    console.log('err', err);
})


// [{"2019-07-20":{"title":"first.md","createTime":"2019-7-22 10:59:07"}},{"2019-07-21":{"title":"second.md","createTime":"2019-7-22 15:31:36"}},{"2019-07-21":{"title":"third.md","createTime":"2019-7-22 15:31:52"}}]

// {"2019-07-20":{"title":"first.md","createTime":"2019-7-22 10:59:07"}}



