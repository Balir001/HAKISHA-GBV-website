import { AgeGroupEntry } from "./AgeGroupEntry"
import { ModeOfViolenceEntry } from "./ModeOfViolenceEntry"
import { OrganisationEntry } from "./OrganisationEntry"
import { RoleEntry } from "./RolesEntry"
import { SpecializationEntry } from "./SpecializatonEntry"




export const MetaDataEntry=()=>{
    return(
        <div className="Meta-data">
            <div>
                <RoleEntry/>
            </div>
            <div>
                <ModeOfViolenceEntry/>
            </div>
            <div>
                <AgeGroupEntry/>
            </div>
            <div>
                <OrganisationEntry/>
            </div>
            <div>
                <SpecializationEntry/>
            </div>
            
        </div>
    )

}