class Bojovnik {
    constructor(jmeno, sila, zivoty) {
        this.jmeno = jmeno
        this.sila = sila
        this.zivoty = zivoty
    }

    utok() {
        return this.sila + this.zivoty / 100
    }

    zraneni(silaUtoku) {
        const zraneni = parseInt(silaUtoku - this.zivoty / 100)
        this.zivoty -= zraneni
        Duel.zraneni = zraneni
    }

    vypis(zprava) {
        let vypis = "\n" + `Bojovnik ${this.jmeno} (sila ${this.sila}) ma jeste ${this.zivoty} zivotu.` + "\n"
        if (zprava) {
            vypis = zprava + vypis
        }
        console.log(vypis)
    }
}


class Duel {

    static async zacniDuel(bojovnik1, bojovnik2) {
        const poradi = [bojovnik1, bojovnik2]

        while (true) {
            const utocnik = poradi[0]
            const obrance = poradi[1]
            const obranceZivoty = obrance.zivoty

            Duel.utok(utocnik, obrance)
            obrance.vypis(`Zautocil ${utocnik.jmeno} silou ${parseInt(utocnik.utok())}
a zranil ${obrance.jmeno}a za ${Duel.zraneni} z jeho ${obranceZivoty}-ti zivotu.`)

            if (obrance.zivoty <= 0) {
                console.log(`${obrance.jmeno} je mrtev. Zvitezil ${utocnik.jmeno}`)
                break
            } else if (utocnik.zivoty <= 0) {
                console.log(`${utocnik.jmeno} je mrtev. Zvitezil ${obrance.jmeno}`)
                break
            }

            poradi.reverse()
            await sleep(4500)
        }
    }


    static prihlas(...bojovnici) {
        bojovnici.forEach(b => {
            Duel.bojovnici.set(b.jmeno, b)
            console.log(`Byl pridan bojovnik ${b.jmeno}.`)
        })

        console.log(Duel.bojovnici)
    }

    // teto metode staci jako atributy jen jmena bojovniku
    static utok2(utocnik, obrance) {
        const utoc = Duel.bojovnici.get(utocnik)
        const obr = Duel.bojovnici.get(obrance)
        obr.zraneni(utoc.utok())
        console.log(Duel.bojovnici)
    }


    // utocnik utoci na obrance
    // tato metoda ma jako atributy cele objekty bojovniku
    static utok(utocnik, obrance) {
        obrance.zraneni(utocnik.utok())
    }
}
Duel.bojovnici = new Map()

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


// Bojovnik(jmeno, sila, zivoty)
const conan = new Bojovnik("Conan", 15, 40)
const kull = new Bojovnik("Kull", 12, 50)
Duel.prihlas(conan, kull)
Duel.zacniDuel(conan, kull)

// Duel.utok2("Conan", "Kull")
// Duel.utok2("Kull", "Kull")