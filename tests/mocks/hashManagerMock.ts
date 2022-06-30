export class HashManagerMock {
    public hash = async (s: string): Promise<any> => {
       return "hash"
    }
 
    public compare = async (s: string, hash: string): Promise<boolean> => {
       return s === hash
    }
 }