module.exports.linkPattern = /\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/;
module.exports.idPattern = /.*id.*/i;

module.exports.validateLink = (link) => this.linkPattern.test(link);
