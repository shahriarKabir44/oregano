import {Subject} from 'rxjs'
const selectedTags=new Subject()

const TagsSelectionService={
    setTagList:(tagList)=>selectedTags.next(tagList),
    getTagList:()=>selectedTags.asObservable()
}
export default TagsSelectionService