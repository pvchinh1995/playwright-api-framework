import dev from "./dev";
import stg from "./stg";
import prod from "./prod";

const ENV = process.env.ENV || "dev";

const config = {
    dev,
    stg,
    prod
};

export default config[ENV as keyof typeof config];