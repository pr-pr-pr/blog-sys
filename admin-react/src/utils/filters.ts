export function roleFilter(role: boolean) {
  return role ? '管理员' : '普通用户';
}

export function paramsFilter(obj: { [key: string]: any } = {}) {
  const newObj = {} as typeof obj;
  for (let [k, v] of Object.entries(obj)) {
    if (v != null && v !== '') {
      newObj[k] = v;
    }
  }
  return newObj;
}
