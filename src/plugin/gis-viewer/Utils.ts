export class Utils {
  private constructor() {}
  public static async loadScripts(scriptUrls: string[]): Promise<any> {
    console.log(scriptUrls);
    let promises = scriptUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = url;
        scriptElement.onload = resolve;
        document.body.appendChild(scriptElement);
      });
    });
    return new Promise((resolve) => {
      Promise.all(promises).then((e) => {
        resolve(e);
      });
    });
  }
}
