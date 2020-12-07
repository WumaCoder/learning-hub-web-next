import { isEmpty, isObject } from "./type";

/**
 *
 * @param {Object} data 数据
 * @param {Object} rules 规则
 * @example
 * data{
 *  field:value
 * }
 *
 * rules{
 *  field:{
 *    type:String, //基本类型判断
 *    required:Boolean, //是否为空
 *    resolve:Fun
 *  }
 * }
 */
export function verify(data, rules) {
  if (!isObject(data)) {
    throw new Error("data not object");
  }
  if (!isObject(rules)) {
    throw new Error("data not object");
  }
  const keys = Object.keys(rules);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (typeof data[key] !== rules[key].type) {
      return {
        field: key,
        isPass: false,
        error: "type err",
      };
    }

    if (rules[key].required && isEmpty(data[key])) {
      return {
        field: key,
        isPass: false,
        error: "value not null",
      };
    }
    if (rules[key].resolve)
      if (!rules[key].resolve(data[key])) {
        return {
          field: key,
          isPass: false,
          error: "resolve err",
        };
      }
  }
  return {
    isPass: true,
  };
}
