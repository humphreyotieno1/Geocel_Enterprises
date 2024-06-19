"""edited tables

Revision ID: a0627416f35f
Revises: 7d403061c336
Create Date: 2024-06-18 14:13:15.089085

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0627416f35f'
down_revision = '7d403061c336'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('admins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('user_name')
    )
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_in_stock', sa.Boolean(), nullable=False))
        batch_op.drop_column('stock')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stock', sa.INTEGER(), nullable=False))
        batch_op.drop_column('is_in_stock')

    op.drop_table('admins')
    # ### end Alembic commands ###