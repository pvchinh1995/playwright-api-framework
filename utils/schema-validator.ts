import Ajv from "ajv";

const ajv = new Ajv();

export function validateSchema(schema: object, data: unknown) {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        console.log(validate.errors);
    }

    return valid;
}