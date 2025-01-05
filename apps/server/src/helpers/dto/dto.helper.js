import { plainToClass, plainToInstance, } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { Utility } from '../utility';
export var DtoHelper;
(function (DtoHelper) {
    // ? Function implementation (not visible from the outside)
    function apply(className, target) {
        return plainToClass(className, target ?? {}, {
            excludeExtraneousValues: true,
        });
    }
    DtoHelper.apply = apply;
    /* -------------------------------------------------------------------------- */
    /*                  CHECK PROPERTIES BEFORE HANDLING REQUEST                  */
    /* -------------------------------------------------------------------------- */
    function validationFactory(metadataKey, model, source) {
        return function (target, propertyName, descriptor) {
            Reflect.defineMetadata(metadataKey, model, target, propertyName);
            const method = descriptor.value;
            descriptor.value = async function () {
                const model = Reflect.getOwnMetadata(metadataKey, target, propertyName);
                const [request, response] = arguments;
                const plain = request[source];
                const instance = plainToInstance(model, plain);
                const errors = await validate(instance);
                if (errors.length > 0) {
                    response.status(400).json(transformValidationErrorsToJSON(errors));
                    return;
                }
                const keys = Object.getOwnPropertyNames(new model());
                const body = {};
                for (const key of keys) {
                    if (Utility.isDefined(plain[key])) {
                        body[key] = plain[key];
                    }
                }
                request.body = body;
                return method.apply(this, arguments);
            };
        };
    }
    DtoHelper.validationFactory = validationFactory;
    function transformValidationErrorsToJSON(errors) {
        return errors.reduce((p, c) => {
            if (!c.children || !c.children.length) {
                p[c.property] = Object.keys(c.constraints).map(key => c.constraints[key]);
            }
            else {
                p[c.property] = transformValidationErrorsToJSON(c.children);
            }
            return p;
        }, {});
    }
})(DtoHelper || (DtoHelper = {}));
