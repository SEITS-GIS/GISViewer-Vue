export class Utils {
  public static async loadScripts(scriptUrls: string[]): Promise<any> {
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
