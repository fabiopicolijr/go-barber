import {
  ObjectID,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string; // user_id

  @Column({ default: false })
  read: boolean;

  @UpdateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Notification;
