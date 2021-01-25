import { Path, GET, DELETE, POST, PUT, QueryParam } from "typescript-rest";
import { getManager } from "typeorm";
import { Item } from "./../entities/Item";

@Path("/item")
export class ItemService {
  /**
   * get a list of items by contractId and between the selected dates
   * @param contractId
   * @param startDate the beginning of the payment period we want to consider
   * @param endDate the end of the payment period we want to consider
   */
  @GET
  getItemsByContractIdStartDateAndEndDate(
    @QueryParam("contractId") contractId: number,
    @QueryParam("startDate") startDate: string,
    @QueryParam("endDate") endDate: string
  ): string {    
    const repository = getManager().getRepository(Item)
    repository.findOne({ contractId: contractId }).then(items => {
        console.log(items)
    })
    return 'Hola'
  }

  /**
   * add one item
   * @param device
   */
  @POST
  addItem(item: Item): Promise<Item> {
    return new Promise<Item>(async (resolve, reject) => {
        console.log(item)
        const repository = getManager().getRepository(Item)
        const newObj = repository.create(item)
        repository.save(newObj).then((newItem: Item) => {
            return resolve(newItem)
        })
    })
  }
}

//curl -d '{"contractId":1, "description":"value2", "value": 100, "isImported": true, "time":"1234","createdAt":"asdas", "updatedAt":"asdas","isDeleted":"asdas"}' -H "Content-Type: application/json" -X POST http://localhost:3000/item
