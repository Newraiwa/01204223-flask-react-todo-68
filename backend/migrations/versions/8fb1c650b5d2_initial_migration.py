"""initial migration

Revision ID: 8fb1c650b5d2
Revises: 
Create Date: 2026-01-29
"""

from alembic import op
import sqlalchemy as sa


revision = "8fb1c650b5d2"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "todo_item",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(length=100), nullable=False),
        sa.Column("done", sa.Boolean(), nullable=False, server_default=sa.false()),
    )

    op.create_table(
        "comment",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("message", sa.String(length=250), nullable=False),
        sa.Column("todo_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["todo_id"],
            ["todo_item.id"],
            name="fk_comment_todo_id",
        ),
    )


def downgrade():
    op.drop_table("comment")
    op.drop_table("todo_item")
