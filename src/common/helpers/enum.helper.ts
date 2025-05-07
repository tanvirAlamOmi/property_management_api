export class EnumHelper {

static enumToKeyValuePairs(enumObj: any): { id: string; name: string }[] {
    return Object.keys(enumObj).map((id) => {
       let name = id
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      return { id, name };
    });
  }
}
