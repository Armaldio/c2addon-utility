'use strict';

const fs = require("fs-extra");
const p = require("path");
const FolderZip = require('folder-zip');
//const _       = require("lodash");
const acetable = require('c2-addon-parser');
const tmp = require('tmp');

var c2addon_template = ' \
<?xml version="1.0" encoding="UTF - 8" ?> \n \
<c2addon> \n \
	<!-- One of: plugin, behavior, effect --> \n \
	<type>{type}</type> \n \
	<name>{name}</name>	 \n \
	<version>{version}</version> \n \
	<author>{author}</author> \n \
	<website>{website}</website> \n \
	<documentation>{help}</documentation> \n \
	<description>{description}</description> \n \
</c2addon>';

function pack(src, dest) {
    var ace = acetable.export(src, {type: 'json'});
    var xml_file = c2addon_template;
    var id = ace.config.id;

    xml_file = xml_file.replace("{type}", "plugin");
    xml_file = xml_file.replace("{name}", ace.config.name || "");
    xml_file = xml_file.replace("{version}", ace.config.version || "");
    xml_file = xml_file.replace("{author}", ace.config.author || "");
    xml_file = xml_file.replace("{website}", ace.config.help || "");
    xml_file = xml_file.replace("{help}", ace.config.help || "");
    xml_file = xml_file.replace("{description}", ace.config.description || "");

    //Ensure destination is ok
    fs.mkdirsSync(dest);

    //Create temp structure
    var tmp_c2addon = tmp.dirSync();
    fs.mkdirsSync(p.join(tmp_c2addon.name, "files", id));
    fs.copySync(src, p.join(tmp_c2addon.name, "files", id));
    fs.writeFileSync(p.join(tmp_c2addon.name, "info.xml"), xml_file, "utf8");

    //Zip temp and write to dest
    var filepath = p.join(p.normalize(dest), id + ".c2addon");

    var options = {
        excludeParentFolder: true //Default : false. if true, the content will be zipped excluding parent folder.
        //parentFolderName: 'v1.0' //if specified, the content will be zipped, within the 'v1.0' folder
    };

    var zip = new FolderZip();
    zip.zipFolder(tmp_c2addon.name, options, function () {
        zip.writeToFile(filepath);
        console.log(".c2addon created at " + filepath);

        //Ensure delete
        fs.emptyDirSync(tmp_c2addon.name);
        tmp_c2addon.removeCallback();
        return true;
    });

    /*
     zip.zipFolder(tmp_c2addon.name, function () {
     zip.writeToFile(filepath);
     console.log(".c2addon created at " + filepath);

     //Ensure delete
     fs.emptyDirSync(tmp_c2addon.name);
     tmp_c2addon.removeCallback();
     return true;
     });
     */
}

function extract(source, destination) {

}

function install(source) {

}

module.exports = {
    pack: function (source, destination) {
        return pack(source, destination);
    },
    extract: function (source, destination) {
        return extract(source, destination);
    },
    install: function (source) {
        return install(source);
    }
};