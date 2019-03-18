const
    fs = require('fs'),
    path = require('path'),
    sourceDir = './endpoints';

module.exports = apiServer => {

    function recurseIntoDir(dir) {

        const x = '.' + sourceDir;

        fs.readdirSync(dir).forEach(item => {

            const p = path.join(dir, item);

            if (fs.lstatSync(p).isDirectory()) {

                return recurseIntoDir(p);
            }

            if (path.extname(p) === false) {
                return;
            }

            const fileName = '../' + p.replace(/\\/g, '/');

            let route = fileName.substring(x.length);

            route = route.substring(0, route.length - 3);


            route = route.replace('/zindex', '');

            console.log(`${route} = ${fileName}`);

            console.log(route, fileName)

            apiServer.use(route, require(fileName));
        });
    }

    recurseIntoDir(sourceDir);
}
