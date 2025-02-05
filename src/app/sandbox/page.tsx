class test {
    public a: number;
    public b: number;
    public c: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
        this.c = a + b;
    }
}

export default async function Home() {
    const test1: test = new test(1, 2);
    console.log(test1);
    return <div>Hello world</div>;
}
