import {Subject} from 'rxjs'
const headerString=new Subject()

const HeaderService={
    setHeaderString:(tagList)=>headerString.next(tagList),
    getHeaderString:()=>headerString.asObservable()
}
export default HeaderService