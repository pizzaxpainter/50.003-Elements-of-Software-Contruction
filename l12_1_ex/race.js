
let a = { bal : 100 }
let b = { bal : 200 }
let c = { bal : 150 }

function get_bal(acc) {
    return new Promise((resolve, reject) => {
        resolve(acc.bal);
    })
}

function set_bal(acc, new_bal) {
    return new Promise((resolve, reject) => {
        acc.bal = new_bal;
        resolve(new_bal);
    })
}

async function transfer(src, dst, amt) {
    let src_bal = await get_bal(src);
    let dst_bal = await get_bal(dst);
    if (src_bal > amt) {
        await set_bal(dst, dst_bal + amt); 
        await set_bal(src, src_bal - amt);
    }
}

async function main() {
    /*
    await Promise.all([
        transfer(b, a, 100),
        transfer(c, a, 50)
    ]);
    */
    await transfer(b, a, 100);
    await transfer(c, a, 50);

}

main().then(
    async function () {
        let bal_b = await get_bal(b);
        let bal_a = await get_bal(a);
        let bal_c = await get_bal(c);
        console.log(bal_a,bal_b,bal_c);
    }
)
