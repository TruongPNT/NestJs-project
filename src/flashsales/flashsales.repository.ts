import { EntityRepository, Repository } from 'typeorm';
import { Flashsale } from './entities/flashsale.entity';

@EntityRepository(Flashsale)
export class FlashSalesRepository extends Repository<Flashsale> {}
