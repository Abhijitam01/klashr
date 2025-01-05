import * as Bcrypt from 'bcryptjs';
const saltRounds = 10;
export var HashHelper;
(function (HashHelper) {
    function run(content) {
        const salt = Bcrypt.genSaltSync(saltRounds);
        const hash = Bcrypt.hashSync(content, salt);
        return hash;
    }
    HashHelper.run = run;
    function verify(value, valueHash) {
        return Bcrypt.compareSync(value, valueHash);
    }
    HashHelper.verify = verify;
})(HashHelper || (HashHelper = {}));
