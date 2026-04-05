class Clinic {
    clinics: any[] = []
    constructor(name: string, location: string){
        this.clinics.push({name, location})
    }
    findOne(name: string){
        const result = this.clinics.find(ele => ele.name == name)
        return result
    }
}
class Doctor{
    constructor(public doctorName: string, public clinic: Clinic){

    }
}

const clinic1 = new Clinic("TIBA", "Cairo")
const doc1 = new Doctor("Ahmed", clinic1)

console.log(doc1.clinic.findOne("TIBA"));
