export class Meeting{
    constructor(
        public m_name: string, 
        public m_tags: string, 
        public m_participant:string,
        public from_date:Date,
        public to_date:Date,
        public location:string,
        public created_by:string
        ){}
}